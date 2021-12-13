import React, { useState } from "react";

import AuthDialog from "../common/AuthDialog";

import styled from "styled-components";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sample from "../../assets/sample.png";

const FeedCarousel = () => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const settings = {
		arrows: true,
		infinite: true,
		dots: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
	};

	const handleDialogOpen = () => {
		setDialogOpen(true);
	};

	const handleDialogClose = () => {
		setDialogOpen(false);
	};

	return (
		<CarouselContainer>
			<StyledCarousel {...settings}>
				<Feed>
					<FeedThumbnail
						src={sample}
						alt="Feed Thumbnail"
						onClick={handleDialogOpen}
					/>
					<AuthDialog
						dialogOpen={dialogOpen}
						handleDialogOpen={handleDialogOpen}
						handleDialogClose={handleDialogClose}
					/>
				</Feed>
				<Feed>
					<FeedThumbnail
						src={sample}
						alt="Feed Thumbnail"
						onClick={handleDialogOpen}
					/>
				</Feed>
				<Feed>
					<FeedThumbnail
						src={sample}
						alt="Feed Thumbnail"
						onClick={handleDialogOpen}
					/>
				</Feed>
				<Feed>
					<FeedThumbnail
						src={sample}
						alt="Feed Thumbnail"
						onClick={handleDialogOpen}
					/>
				</Feed>
				<Feed>
					<FeedThumbnail
						src={sample}
						alt="Feed Thumbnail"
						onClick={handleDialogOpen}
					/>
				</Feed>
				<Feed>
					<FeedThumbnail
						src={sample}
						alt="Feed Thumbnail"
						onClick={handleDialogOpen}
					/>
				</Feed>
			</StyledCarousel>
		</CarouselContainer>
	);
};

export default FeedCarousel;

const CarouselContainer = styled.div`
	width: 68.6rem;
	height: 20rem;
	border: 1px solid #e5e5e5;
	border-radius: 0.5rem;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledCarousel = styled(Slider)`
	width: 60rem;

	display: flex;
	align-items: center;

	.slick-next:before,
	.slick-prev:before {
		color: #000;
	}
`;

const Feed = styled.div`
	height: 15rem;
	padding: 1rem;
	box-sizing: border-box;
`;

const FeedThumbnail = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 0.5rem;
	cursor: pointer;
`;
