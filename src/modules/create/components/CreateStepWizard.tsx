import StepWizard from "@/common/components/elements/StepWizard";

const steps = [
	{ id: 0, title: "Pilih Tema" },
	{ id: 1, title: "Data Informasi" },
	{ id: 2, title: "Pembayaran" },
	{ id: 3, title: "Selesai" },
];

const CreateStepWizard = ({ activeStep }: { activeStep: number }) => {
	const modifiedSteps = steps.slice(activeStep);
	return <StepWizard steps={modifiedSteps} activeStep={activeStep} />;
};

export default CreateStepWizard;
