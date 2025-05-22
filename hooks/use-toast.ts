"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
	ToastActionElement,
	ToastProps,
} from "@/components/ui/toast"

// Allow more than one toast to be shown
const TOAST_LIMIT = 3 // Show up to 3 toasts at once

// Change this constant to a more reasonable duration
const TOAST_REMOVE_DELAY = 5000  // 5 seconds instead of 1000000

// Add type definitions for different toast variants
type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info'

type ToasterToast = ToastProps & {
	id: string
	title?: React.ReactNode
	description?: React.ReactNode
	action?: ToastActionElement
	variant?: ToastVariant
	showProgress?: boolean
	role?: 'alert' | 'status'
	ariaLive?: 'assertive' | 'polite'
}

const defaultToastProps = {
	role: 'status',
	ariaLive: 'polite'
}

const actionTypes = {
	ADD_TOAST: "ADD_TOAST",
	UPDATE_TOAST: "UPDATE_TOAST",
	DISMISS_TOAST: "DISMISS_TOAST",
	REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
	count = (count + 1) % Number.MAX_SAFE_INTEGER
	return count.toString()
}

type ActionType = typeof actionTypes

type Action =
	| {
		type: ActionType["ADD_TOAST"]
		toast: ToasterToast
	}
	| {
		type: ActionType["UPDATE_TOAST"]
		toast: Partial<ToasterToast>
	}
	| {
		type: ActionType["DISMISS_TOAST"]
		toastId?: ToasterToast["id"]
	}
	| {
		type: ActionType["REMOVE_TOAST"]
		toastId?: ToasterToast["id"]
	}

interface State {
	toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
	if (toastTimeouts.has(toastId)) {
		return
	}

	const timeout = setTimeout(() => {
		toastTimeouts.delete(toastId)
		dispatch({
			type: "REMOVE_TOAST",
			toastId: toastId,
		})
	}, TOAST_REMOVE_DELAY)

	toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "ADD_TOAST":
			return {
				...state,
				toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
			}

		case "UPDATE_TOAST":
			return {
				...state,
				toasts: state.toasts.map((t) =>
					t.id === action.toast.id ? { ...t, ...action.toast } : t
				),
			}

		case "DISMISS_TOAST": {
			const { toastId } = action

			// ! Side effects ! - This could be extracted into a dismissToast() action,
			// but I'll keep it here for simplicity
			if (toastId) {
				addToRemoveQueue(toastId)
			} else {
				state.toasts.forEach((toast) => {
					addToRemoveQueue(toast.id)
				})
			}

			return {
				...state,
				toasts: state.toasts.map((t) =>
					t.id === toastId || toastId === undefined
						? {
							...t,
							open: false,
						}
						: t
				),
			}
		}
		case "REMOVE_TOAST":
			if (action.toastId === undefined) {
				return {
					...state,
					toasts: [],
				}
			}
			return {
				...state,
				toasts: state.toasts.filter((t) => t.id !== action.toastId),
			}
	}
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
	memoryState = reducer(memoryState, action)
	listeners.forEach((listener) => {
		listener(memoryState)
	})
}

type Toast = Omit<ToasterToast, "id">

type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'

interface ToastConfig {
	position?: ToastPosition
	duration?: number
}

const defaultConfig: ToastConfig = {
	position: 'bottom-right',
	duration: 5000
}

interface AnimationConfig {
  enter: string
  exit: string
  duration: number
}

const defaultAnimation: AnimationConfig = {
  enter: 'slideIn',
  exit: 'fadeOut',
  duration: 300
}

function toast({ ...props }: Toast) {
	const id = genId()

	const update = (props: ToasterToast) =>
		dispatch({
			type: "UPDATE_TOAST",
			toast: { ...props, id },
		})
	const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

	dispatch({
		type: "ADD_TOAST",
		toast: {
			...props,
			id,
			open: true,
			onOpenChange: (open) => {
				if (!open) dismiss()
			},
		},
	})

	return {
		id: id,
		dismiss,
		update,
	}
}

function useToast() {
	const [state, setState] = React.useState<State>(memoryState)

	React.useEffect(() => {
		listeners.push(setState)
		return () => {
			const index = listeners.indexOf(setState)
			if (index > -1) {
				listeners.splice(index, 1)
			}
		}
	}, [state])

	return {
		...state,
		toast,
		dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
	}
}

export { useToast, toast }


// Add queue management for toasts exceeding the limit
const queuedToasts: ToasterToast[] = []

function addToQueue(toast: ToasterToast) {
	queuedToasts.push(toast)
}

function processQueue() {
	if (queuedToasts.length > 0 && memoryState.toasts.length < TOAST_LIMIT) {
		const nextToast = queuedToasts.shift()
		if (nextToast) {
			dispatch({
				type: "ADD_TOAST",
				toast: nextToast
			})
		}
	}
}
