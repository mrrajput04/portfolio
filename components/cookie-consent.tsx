"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CookieConsent() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Check if the user has already accepted cookies
		const consent = localStorage.getItem('cookie_consent');
		if (!consent) {
			setIsVisible(true);
		}
	}, []);

	const handleAccept = () => {
		// Set consent in local storage and hide the banner
		localStorage.setItem('cookie_consent', 'accepted');
		setIsVisible(false);
	};

	if (!isVisible) {
		return null;
	}

	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 p-4">
			<Card className="max-w-md mx-auto shadow-lg">
				<CardContent className="flex items-center justify-between p-4">
					<p className="text-sm text-muted-foreground">
						We use cookies to ensure you get the best experience on our website.
					</p>
					<Button onClick={handleAccept} size="sm">
						Accept
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}