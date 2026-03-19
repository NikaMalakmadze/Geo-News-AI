import { LuImage, LuMeh } from "react-icons/lu";
import { Fade } from "transitions-kit";
import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	inView: boolean;
}

type TImageStatus = "loading" | "loaded" | "failed";

function Image({ inView, ...imageProps }: ImageProps) {
	const [status, setStatus] = React.useState<TImageStatus>("loading");
	const [ratio, setRatio] = React.useState<number | null>();

	React.useEffect(() => {
		if (!inView || !imageProps.src) return;

		const img = new window.Image();
		img.src = imageProps.src;

		img.onload = () => {
			setRatio(img.naturalWidth / img.naturalHeight);
			setStatus("loaded");
		};

		img.onerror = () => setStatus("failed");
	}, [inView, imageProps]);

	return (
		<div
			className="relative w-full mb-5 overflow-hidden"
			style={{ aspectRatio: ratio ?? "16 / 9" }}
		>
			<Fade
				appear={false}
				in={status === "loading"}
				easing={"cubic-bezier(.99,-0.64,.42,.8)"}
				timeout={{ exit: 200 }}
				unmountOnExit
			>
				<div className="absolute inset-0 flex items-center justify-center text-neutral-500 bg-neutral-100/90 rounded-2xl">
					<LuImage className="w-12 h-12 md:w-20 md:h-20" />
				</div>
			</Fade>
			{inView && (
				<Fade
					in={status === "loaded"}
					easing={"cubic-bezier(.99,-0.64,.42,.8)"}
					timeout={{
						appear: 300,
						enter: 300,
						exit: 0,
					}}
				>
					<img
						{...imageProps}
						className="absolute inset-0 w-full h-full object-cover"
						loading="lazy"
					/>
				</Fade>
			)}
			<Fade in={status === "failed"} mountOnEnter unmountOnExit>
				<div className="absolute inset-0 flex items-center justify-center text-neutral-500 bg-neutral-100/90 rounded-2xl">
					<LuMeh className="w-12 h-12 md:w-20 md:h-20" />
				</div>
			</Fade>
		</div>
	);
}

export default Image;
