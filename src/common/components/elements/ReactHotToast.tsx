import React from "react";
import { Toaster } from "react-hot-toast";

const ReactHotToast = () => {
	return (
		<Toaster
			position="top-center"
			toastOptions={{
				duration: 3000,
				style: {
					marginBottom: " 3px",
					width: "100%",
					height: "50px",
					maxWidth: "450px",
					borderRadius: "10px",
				},
				success: {
					style: {
						background: "#63d246",
						color: "#fff",
					},
					iconTheme: {
						primary: "#fff",
						secondary: "#63d246",
					},
				},
				error: {
					style: {
						background: "#ff4c4d",
						color: "#fff",
					},
					iconTheme: {
						primary: "#fff",
						secondary: "#ff4c4d",
					},
				},
			}}
		/>
	);
};

export default ReactHotToast;
