import React, { Component } from "react";

import styled from "styled-components";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class FeedCarousel extends Component {
	render() {
		const settings = {
			arrows: true,
			infinite: true,
			dots: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 3,
		};

		return (
			<CarouselContainer>
				<StyledCarousel {...settings}>
					<Slide />
					<Slide />
					<Slide />
					<Slide />
					<Slide />
					<Slide />
				</StyledCarousel>
			</CarouselContainer>
		);
	}
}

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

const Slide = styled.div`
	height: 15rem;
	border: 1px solid red;
	box-sizing: border-box;
`;
