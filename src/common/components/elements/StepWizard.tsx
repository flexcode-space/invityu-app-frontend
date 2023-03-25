import React, { useState } from "react";

interface Step {
	id: number;
	title: string;
}

interface Props {
	steps: Step[];
	activeStep: number;
	onStepClick?: (stepIndex: number) => void;
}

const StepWizard: React.FC<Props> = ({
	steps,
	activeStep,
	onStepClick = () => {},
}) => {
	const [hoveredStep, setHoveredStep] = useState<number | null>(null);

	return (
		<div className="flex items-center gap-5 overflow-x-hidden scrollbar-hide">
			{steps.map((step, _) => (
				<div
					key={step?.id}
					className="flex items-center min-w-fit px-3 relative"
					onClick={() => onStepClick(step?.id)}
					onMouseEnter={() => setHoveredStep(step?.id)}
					onMouseLeave={() => setHoveredStep(null)}
				>
					{step?.id !== 1 && (
						<div className="h-full absolute left-0 top-1/2 -ml-5 w-5">
							<hr />
						</div>
					)}

					{step?.id === activeStep && <div className="ml-5"></div>}

					<div
						className={`w-6 h-6 text-xs flex items-center justify-center rounded-full border ${
							step?.id === activeStep
								? "bg-primary-50 text-primary-600 border-primary-50"
								: step?.id < activeStep
								? "bg-primary-50 text-white border-primary-50"
								: "text-primary-100 border-primary-50"
						}`}
					>
						{step?.id + 1}
					</div>
					<div className="ml-4">
						<div
							className={`text-sm font-semibold ${
								step?.id === activeStep
									? "text-primary-600"
									: "text-primary-100"
							}`}
						>
							{step.title}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default StepWizard;
