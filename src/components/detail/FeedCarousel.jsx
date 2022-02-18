import React, { useState } from "react";

import styled from "styled-components";

import { customMedia } from "../../GlobalStyles";
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
					<Feed id={list[0]?.certificationId}>
						<FeedThumbnail
							id={list[0]?.certificationId}
							src={list[0]?.imgUrl}
							alt="Feed Thumbnail"
							onClick={(e) => {
								handleOpenDialog(e.target.id);
								handleOpenToggle();
							}}
						/>
						<AuthViewDialog
							id={list[0]?.certificationId}
							open={open}
							handleOpenToggle={handleOpenToggle}
							openDialog={openDialog}
							handleOpenDialog={handleOpenDialog}
							challengeId={challengeId}
							certifyId={list[0].userId}
							certifyImg={list[0]?.imgUrl}
							certifyDate={list[0]?.createdDate}
							certifyContents={list[0]?.contents}
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
					<Feed id={list[0]?.certificationId}>
						<FeedThumbnail
							id={list[0]?.certificationId}
							src={list[0]?.imgUrl}
							alt="Feed Thumbnail"
							onClick={(e) => {
								handleOpenDialog(e.target.id);
								handleOpenToggle();
							}}
						/>
						<AuthViewDialog
							id={list[0]?.certificationId}
							open={open}
							handleOpenToggle={handleOpenToggle}
							openDialog={openDialog}
							handleOpenDialog={handleOpenDialog}
							certifyId={list[0]?.userId}
							certifyImg={list[0]?.imgUrl}
							certifyDate={list[0]?.createdDate}
							certifyContents={list[0]?.contents}
							challengeId={challengeId}
							userChallengeId={userChallengeId}
						/>
					</Feed>
					<Feed id={list[1]?.certificationId}>
						<FeedThumbnail
							id={list[1]?.certificationId}
							src={list[1]?.imgUrl}
							alt="Feed Thumbnail"
							onClick={(e) => {
								handleOpenDialog(e.target.id);
								handleOpenToggle();
							}}
						/>
						<AuthViewDialog
							id={list[1]?.certificationId}
							open={open}
							handleOpenToggle={handleOpenToggle}
							openDialog={openDialog}
							handleOpenDialog={handleOpenDialog}
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
						<Feed key={item?.certificationId} id={item?.certificationId}>
							<FeedThumbnail
								id={item?.certificationId}
								src={item?.imgUrl}
								alt="Feed Thumbnail"
								onClick={(e) => {
									handleOpenDialog(e.target.id);
									handleOpenToggle();
								}}
							/>
							<AuthViewDialog
								id={item?.certificationId}
								open={open}
								handleOpenToggle={handleOpenToggle}
								openDialog={openDialog}
								handleOpenDialog={handleOpenDialog}
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
  
  ${customMedia.lessThan("mobile")`
    width: 31.5rem;
	  height: 10rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    width: 31.5rem;
	  height: 10rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    width: 31.5rem;
    height: 10rem;
  `}

  ${customMedia.between("tablet", "desktop")`
    width: 48rem;
    height: 15rem;
  `}
`;

const StyledCarousel = styled(Slider)`
	width: 90%;

	.slick-next:before,
	.slick-prev:before {
    color: #000000;

    ${customMedia.lessThan("mobile")`
      font-size: 1.2rem;
    `}

    ${customMedia.between("mobile", "lgMobile")`
      font-size: 1.2rem;
    `}
    
    ${customMedia.between("lgMobile", "tablet")`
      font-size: 1.2rem;
    `}
    
    ${customMedia.between("tablet", "desktop")`
      font-size: 1.2rem;
    `}
  }

    .slick-prev{
      ${customMedia.lessThan("mobile")`
        left: -1.5rem;
      `}

      ${customMedia.between("mobile", "lgMobile")`
        left: -1.5rem;
      `}

      ${customMedia.between("tablet", "desktop")`
        left: -1.5rem;
      `}
    }

    .slick-next{
      ${customMedia.lessThan("mobile")`
        right: -1.5rem;
      `}

      ${customMedia.between("mobile", "lgMobile")`
        right: -1.5rem;
      `}

      ${customMedia.between("tablet", "desktop")`
        right: -1.5rem;
      `}
    }

    .slick-dots{
      ${customMedia.lessThan("mobile")`
        bottom: -1rem;
      `}

      ${customMedia.between("mobile", "lgMobile")`
        bottom: -1rem;
      `}
      
      ${customMedia.between("lgMobile", "tablet")`
        bottom: -1rem;
      `}

      ${customMedia.between("tablet", "desktop")`
        bottom: -1.5rem;
      `}
    }
`;

const Feed = styled.div`
	height: 15rem;
	padding: 1rem;
  box-sizing: border-box;
  
  ${customMedia.lessThan("mobile")`
    height: 8rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    height: 8rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    height: 8.5rem;
  `}

  ${customMedia.between("tablet", "desktop")`
    height: 12rem;
  `}
`;

const FeedThumbnail = styled.img`
	width: 100%;
	height: 100%;
	cursor: pointer;
	border-radius: 0.5rem;
`;
