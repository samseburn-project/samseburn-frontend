import React, { useState } from "react";

import styled from "styled-components";

import Slider from "react-slick";
import AuthViewDialog from "./AuthViewDialog";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeedCarousel = ({ ...props }) => {
	const [openDialog, setOpenDialog] = useState("");
	const [open, setOpen] = useState(false);
	const certifies = props?.certifies;
	const challengeId = props?.challengeId;
	const userChallengeId = props?.userChallengeId;
	const placeholderImgUrl = "https://plchldr.co/i/186x130?&bg=C4C4C4&fc=ffffff";

	console.log(certifies);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
	};

	const handleOpenDialog = (targetId) => {
		setOpenDialog(targetId);
	};

	const handleOpenToggle = () => {
		setOpen(!open);
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
							id="feed"
							src={list[0]?.imgUrl}
							alt="Feed Thumbnail"
							onClick={(e) => {
								console.log(e.target);
								handleOpenDialog(e.target.id);
								handleOpenToggle();
							}}
						/>
						<AuthViewDialog
							open={open}
							handleOpenToggle={handleOpenToggle}
							openDialog={openDialog}
							handleOpenDialog={handleOpenDialog}
							challengeId={challengeId}
							certify={list[0]}
							certifyId={list[0].userId}
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
					<Feed
						onClick={(e) => {
							console.log(e.target.id);
							handleOpenDialog(e.target.id);
							handleOpenToggle();
						}}
					>
						<FeedThumbnail
							id="feed"
							src={list[0]?.imgUrl}
							alt="Feed Thumbnail"
						/>
						<AuthViewDialog
							open={open}
							handleOpenToggle={handleOpenToggle}
							openDialog={openDialog}
							handleOpenDialog={handleOpenDialog}
							certify={list[0]}
							certifyId={list[0].userId}
							certifyImg={list[0].imgUrl}
							certifyDate={list[0].createdDate}
							certifyContents={list[0].contents}
							challengeId={challengeId}
							userChallengeId={userChallengeId}
						/>
					</Feed>
					<Feed
						onClick={(e) => {
							console.log(e.target.id);
							handleOpenDialog(e.target.id);
							handleOpenToggle();
						}}
					>
						<FeedThumbnail
							id="feed"
							src={list[1]?.imgUrl}
							alt="Feed Thumbnail"
						/>
						<AuthViewDialog
							open={open}
							handleOpenToggle={handleOpenToggle}
							openDialog={openDialog}
							handleOpenDialog={handleOpenDialog}
							certify={list[1]}
							certifyId={list[1].userId}
							certifyImg={list[1].imgUrl}
							certifyDate={list[1].createdDate}
							certifyContents={list[1].contents}
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
						<Feed
							key={item?.certificationId}
							onClick={(e) => {
								console.log(e.target.id);
								handleOpenDialog(e.target.id);
								handleOpenToggle();
							}}
						>
							<FeedThumbnail
								id="feed"
								src={item?.imgUrl}
								alt="Feed Thumbnail"
								onClick={handleOpenToggle}
							/>
							<AuthViewDialog
								open={open}
								handleOpenToggle={handleOpenToggle}
								openDialog={openDialog}
								handleOpenDialog={handleOpenDialog}
								certify={item}
								certifyId={item.userId}
								certifyImg={item.imgUrl}
								certifyDate={item.createdDate}
								certifyContents={item.contents}
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
