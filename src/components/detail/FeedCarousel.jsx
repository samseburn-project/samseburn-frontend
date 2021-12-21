import React, { useState } from "react";

import styled from "styled-components";

import Slider from "react-slick";
import AuthDialog from "../common/AuthDialog";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeedCarousel = ({ ...props }) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const certifies = props?.certifies;
	const challengeId = props?.challengeId;
	const userChallengeId = props?.userChallengeId;
	const placeholderImgUrl = "https://plchldr.co/i/186x130?&bg=C4C4C4&fc=ffffff";

	const settings = {
		dots: true,
		infinite: true,
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

	const renderFeedCarousel = (list) => {
		if (list.length === 0) {
			return (
				<StyledCarousel {...settings}>
					<Feed>
						<FeedThumbnail src={placeholderImgUrl} alt="Feed Thumbnail" />
					</Feed>
					<Feed>
						<FeedThumbnail src={placeholderImgUrl} alt="Feed Thumbnail" />
					</Feed>
					<Feed>
						<FeedThumbnail src={placeholderImgUrl} alt="Feed Thumbnail" />
					</Feed>
				</StyledCarousel>
			);
		} else if (list.length === 1) {
			return (
				<StyledCarousel {...settings}>
					<Feed>
						<FeedThumbnail
							src={list[0]?.imgUrl}
							alt="Feed Thumbnail"
							onClick={handleDialogOpen}
						/>
						<AuthDialog
							dialogOpen={dialogOpen}
							handleDialogClose={handleDialogClose}
							certify={list[0]}
							challengeId={challengeId}
							userChallengeId={userChallengeId}
						/>
					</Feed>
					<Feed>
						<FeedThumbnail src={placeholderImgUrl} alt="Feed Thumbnail" />
					</Feed>
					<Feed>
						<FeedThumbnail src={placeholderImgUrl} alt="Feed Thumbnail" />
					</Feed>
				</StyledCarousel>
			);
		} else if (list.length === 2) {
			return (
				<StyledCarousel {...settings}>
					<Feed>
						<FeedThumbnail
							src={list[0]?.imgUrl}
							alt="Feed Thumbnail"
							onClick={handleDialogOpen}
						/>
						<AuthDialog
							dialogOpen={dialogOpen}
							handleDialogClose={handleDialogClose}
							certify={list[0]}
							challengeId={challengeId}
							userChallengeId={userChallengeId}
						/>
					</Feed>
					<Feed>
						<FeedThumbnail
							src={list[1]?.imgUrl}
							alt="Feed Thumbnail"
							onClick={handleDialogOpen}
						/>
						<AuthDialog
							dialogOpen={dialogOpen}
							handleDialogClose={handleDialogClose}
							certify={list[1]}
							challengeId={challengeId}
							userChallengeId={userChallengeId}
						/>
					</Feed>
					<Feed>
						<FeedThumbnail src={placeholderImgUrl} alt="Feed Thumbnail" />
					</Feed>
				</StyledCarousel>
			);
		} else {
			return (
				<StyledCarousel {...settings}>
					{list.map((item) => (
						<Feed key={item?.certificationId}>
							<FeedThumbnail
								src={item?.imgUrl}
								alt="Feed Thumbnail"
								onClick={handleDialogOpen}
							/>
							<AuthDialog
								dialogOpen={dialogOpen}
								handleDialogClose={handleDialogClose}
								certify={item}
								challengeId={challengeId}
								userChallengeId={userChallengeId}
							/>
						</Feed>
					))}
				</StyledCarousel>
			);
		}
	};

	return <CarouselContainer>{renderFeedCarousel(certifies)}</CarouselContainer>;
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
	width: 90%;

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
