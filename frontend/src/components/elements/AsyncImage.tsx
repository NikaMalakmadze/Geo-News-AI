import { InView } from "react-intersection-observer";

import Image from "./Image";

function AsyncImage(imageProps: React.ImgHTMLAttributes<HTMLImageElement>) {
	return (
		<InView triggerOnce>
			{({ ref, inView }) => (
				<div ref={ref}>
					<Image inView={inView} {...imageProps} />
				</div>
			)}
		</InView>
	);
}

export default AsyncImage;
