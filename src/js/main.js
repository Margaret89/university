//Swiper
import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

//Слайдер предложений на главной странице
if(document.querySelector('.js-info-slider')){
	var штащSlider = new Swiper('.js-info-slider', {
		modules: [Navigation, Pagination],
		loop:true,
        pagination:{
            el:".js-info-slider-pagination",
            clickable:true
        },
        navigation: {
            nextEl: '.js-info-slider-next',
            prevEl: '.js-info-slider-prev',
        },
		// breakpoints: {
		// 	1600: {
		// 		slidesPerView: 10,
		// 	},
		// 	992: {
		// 		slidesPerView: 6,
		// 	},
		// 	767: {
		// 		slidesPerView: 8,
		// 	},
		// }
	});
}
