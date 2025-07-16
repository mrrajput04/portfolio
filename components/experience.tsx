"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap } from "lucide-react"
import ScrollAnimation, { StaggerGroup, StaggerItem } from "@/components/ui/scroll-animation"

/**
 * @typedef {Object} WorkExperience
 * @property {string} title - Job title
 * @property {string} company - Company name
 * @property {string} location - Job location
 * @property {string} period - Employment period
 * @property {string[]} responsibilities - Array of job responsibilities
 */

/**
 * @typedef {Object} Education
 * @property {string} degree - Degree name
 * @property {string} institution - Institution name
 * @property {string} period - Study period
 */

/**
 * Experience section component that displays work experience and education
 * Includes animated cards for both work history and educational background
 * 
 * @component
 * @returns {JSX.Element} A section containing work experience and education details
 */
export default function Experience() {
	const workExperience = [
		{
			title: "Software Developer (SDE-2)",
			company: "DSV Atrium labs",
			location: "Punchkula, India",
			period: "May 2025 – Present",
			responsibilities: [
				"Developed and maintained backend solutions for a medical gamification application using Node.js, Express.js, and MySQL database.",
				"Architected and implemented AWS cloud services including Lambda functions, ECS, CloudWatch monitoring, Secrets Manager, SQS, and SES for scalable healthcare solutions.",
				"Built interactive case-solving modules across multiple medical specializations, enabling healthcare professionals to enhance their knowledge through gamified learning experiences.",
				"Collaborated with cross - functional teams using Git for version control and delivered high- quality code through comprehensive peer reviews.",
				"Ensured optimal application performance, security, and responsiveness in a healthcare learning environment while managing sensitive medical educational content.",
			],
		},
		{
			title: "Full Stack Developer (SDE-1)",
			company: "Excellence Technologies",
			location: "Noida, India",
			period: "February 2023 – April 2025",
			responsibilities: [
				"Developed and maintained full-stack solutions using Node.js, Express.js with MongoDB and MySQL databases for fintech and student management systems.",
				"Deployed and managed applications on AWS(Lambda, EC2) and GCP Lambda with Docker containerization for scalable cloud infrastructure.",
				"Built comprehensive student management system and interactive dashboard reports using Power BI for data visualization and business intelligence.",
				"Collaborated with cross - functional teams using Git, GitHub, Jira, and Confluence for efficient project management and documentation.",
				"Ensured high application performance, security, and reliability across fintech applications handling sensitive financial data and student information systems.",
			],
		},
	]

	const education = [
		{
			degree: "Master of Computer Applications (MCA)",
			institution: "Bhagwant Global University, Kotdwara",
			period: "July 2023 – June 2025",
		},
		{
			degree: "Bachelor of Computer Applications (BCA)",
			institution: "MJP Rohilkhand University, Bareilly",
			period: "July 2019 – Dec 2022",
		},
	]

	return (
		<section id="experience" className="py-12 sm:py-16 px-4 md:px-6 bg-muted/50">
			<div className="container mx-auto max-w-5xl">
				<ScrollAnimation type="fade-up" className="mb-8 sm:mb-12">
					<h2 className="text-2xl sm:text-3xl font-bold text-center">Experience & Education</h2>
				</ScrollAnimation>

				<div className="space-y-8 sm:space-y-12">
					<ScrollAnimation type="fade-up" delay={0.1}>
						<div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
							<Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
							<h3 className="text-xl sm:text-2xl font-semibold">Work Experience</h3>
						</div>

						<StaggerGroup className="space-y-4 sm:space-y-6">
							{workExperience.map((job, index) => (
								<StaggerItem key={index} index={index + 1}>
									<Card className="transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
										<CardHeader className="pb-2">
											<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
												<CardTitle className="text-lg sm:text-xl">{job.title}</CardTitle>
												<Badge variant="outline" className="w-fit">
													{job.period}
												</Badge>
											</div>
											<div className="text-sm sm:text-base text-muted-foreground">
												{job.company}, {job.location}
											</div>
										</CardHeader>
										<CardContent>
											<ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
												{job.responsibilities.map((responsibility, respIndex) => (
													<li
														key={respIndex}
														className="transition-all duration-300 hover:translate-x-1"
													>
														{responsibility}
													</li>
												))}
											</ul>
										</CardContent>
									</Card>
								</StaggerItem>
							))}
						</StaggerGroup>
					</ScrollAnimation>

					<ScrollAnimation type="fade-up" delay={0.3}>
						<div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
							<GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
							<h3 className="text-xl sm:text-2xl font-semibold">Education</h3>
						</div>

						<StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
							{education.map((edu, index) => (
								<StaggerItem key={index} index={index + 1}>
									<Card className="transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
										<CardHeader className="pb-2">
											<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
												<CardTitle className="text-lg sm:text-xl">{edu.degree}</CardTitle>
												<Badge variant="outline" className="w-fit">
													{edu.period}
												</Badge>
											</div>
											<div className="text-sm sm:text-base text-muted-foreground">{edu.institution}</div>
										</CardHeader>
									</Card>
								</StaggerItem>
							))}
						</StaggerGroup>
					</ScrollAnimation>
				</div>
			</div>
		</section>
	)
}

