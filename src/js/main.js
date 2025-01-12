//Swiper
import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

//Inputmask
import Inputmask from "inputmask";

//Fancybox
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
Fancybox.bind("[data-fancybox]", {
	on: {
		done: (fancybox, slide) => {
			if(document.querySelector('.popup-window')){
				document.querySelector('.popup-window').classList.remove('hide');
			}
		},
		close: (fancybox, slide) => {
			if(document.querySelector('.popup-window')){
				document.querySelector('.popup-window').classList.add('hide');
			}
		}
	}
});

//Choices
import  Choices from 'choices.js/public/assets/scripts/choices.js';
import 'choices.js/public/assets/styles/choices.min.css';

// Ширина экрана
let screenWidth = window.screen.width;

window.addEventListener('resize', () => {
	screenWidth = window.screen.width;
});

document.addEventListener("DOMContentLoaded", function(){
	// Маска для телефона
	if(document.querySelector('.js-phone')){
		Inputmask('+7 (999) 999-9999').mask('.js-phone');
	}

	//Кастомный селект
	if(document.querySelector('.js-select')){
		document.querySelectorAll(".js-select").forEach(function(select){
			const choices = new Choices(select, {
				searchEnabled: false,
				removeItemButton: false,
				shouldSort: false,
			});
		});
	}
});


//Слайдер предложений на главной странице
if(document.querySelector('.js-info-slider')){
	var infoSlider = new Swiper('.js-info-slider', {
		modules: [Navigation, Pagination],
		loop: true,
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

//Слайдер предложений в сайдбаре
if(document.querySelector('.js-info-slider-mobile')){
	var infoSliderMobile = new Swiper('.js-info-slider-mobile', {
		modules: [Pagination],
		loop: true,
		pagination:{
			el:".js-info-slider-pagination-mobile",
			clickable:true
		},
	});
}

//Слайдер партнеров
if(document.querySelector('.js-partners-slider')){
	var partnersSlider = new Swiper('.js-partners-slider', {
		modules: [Pagination],
		loop: true,
		slidesPerView: 4,
		spaceBetween: 20,
		pagination:{
			el:".js-partners-slider-pagination",
			clickable:true
		},
	});
}

//Открыть/Закрыть попап с меню
document.querySelector('.js-switch-header-popup').addEventListener('click', function(elem){
	this.classList.toggle('active');
	document.querySelector('.js-header-popup').classList.toggle('open');
});

// Раскрывающийся блок
document.querySelectorAll('.js-unwrap-block').forEach((accSection) => {
	const accHeader = accSection.querySelector('.js-unwrap-head');
	const accBody = accSection.querySelector('.js-unwrap-content');
	const accContent = accSection.querySelector('.js-unwrap-info');
	
	accHeader.addEventListener('click', () => {
		accSection.classList.toggle("opened");
		
		if ( accSection.classList.contains("opened") ) {
			accBody.style.maxHeight = `${accContent.clientHeight}px`;
		} else {
			accBody.style.maxHeight = "0px";
		}
	})
});

// Открыть/Закрыть мобильное меню
document.querySelectorAll('.js-main-menu').forEach((accSection) => {
	if(screenWidth < 992){
		const accHeader = accSection.querySelector('.js-main-menu-title-wrap');
		const accBody = accSection.querySelector('.js-main-menu-content');
		const accContent = accSection.querySelector('.js-main-menu-sub');
		
		accHeader.addEventListener('click', () => {
			accSection.classList.toggle("opened");
			
			if ( accSection.classList.contains("opened") ) {
				accBody.style.maxHeight = `${accContent.clientHeight}px`;
			} else {
				accBody.style.maxHeight = "0px";
			}
		})
	}
});

// Открыть/Закрыть фильтр
document.querySelectorAll('.js-filter').forEach((accSection) => {
	if(screenWidth < 1280){
		const accHeader = accSection.querySelector('.js-filter-top');
		const accBody = accSection.querySelector('.js-filter-content-wrap');
		const accContent = accSection.querySelector('.js-filter-content');
		
		accHeader.addEventListener('click', () => {
			accSection.classList.toggle("opened");
			
			if ( accSection.classList.contains("opened") ) {
				accBody.style.maxHeight = `${accContent.clientHeight}px`;
			} else {
				accBody.style.maxHeight = "0px";
			}
		})
	}
});

// Валидация форм

//Функция добавления ошибки
const generateError = function (text) {
	var error = document.createElement('div')
	error.className = 'error-msg'
	// error.style.color = 'red'
	error.innerHTML = text
	return error
}

document.querySelectorAll(".js-btn-submit").forEach(function(btn){
	btn.onclick = function(e){
		e.preventDefault();

		var form =  e.target.closest('form');
		var patternEmail = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;

		//Очистка ошибок
		form.querySelectorAll('.error').forEach(function(err){
			if(err.querySelector('.error-msg')){
				err.querySelector('.error-msg').remove();
			}
			err.querySelector('input').setAttribute('placeholder', '');
			err.classList.remove('error');
		});
	  
		//Проверка полей на пустоту
		form.querySelectorAll('.js-form-site-item input').forEach(function(field){
			//Проверка email
			// if(field.type == 'email' && field.value !== ''){
			if(field.type == 'email'){
				if (!patternEmail.test(field.value)) {
					var errorMsg =  generateError('Укажите корректный E-mail');
					field.closest('.js-form-site-item').classList.add('error');
					// field.setAttribute('placeholder', errorMsg);
					field.closest('.js-form-site-item').append(errorMsg);
				}
			}else{
				//Проверка всех полей
				if (field.value === '' &&  field.hasAttribute('required')) {
					var errorMsg = generateError('Заполните поле');
					field.closest('.js-form-site-item').classList.add('error');
					// field.setAttribute('placeholder', errorMsg);
					field.closest('.js-form-site-item').append(errorMsg);
				}
			}
		});

		//Проверка checkbox на checked
		form.querySelectorAll('.js-form-site-check input').forEach(function(field){
			if(!field.checked && field.hasAttribute('required')){
				var errorMsg = generateError('Заполните поле');
				field.closest('.js-form-site-check').classList.add('error');
				field.parentElement.after(errorMsg);
			}
		});

		// var idRecaptcha = btn.closest('form').querySelector('.g-recaptcha').getAttribute('data-widget');

		// console.log('idRecaptcha = ', idRecaptcha);
		// var response = grecaptcha.getResponse(idRecaptcha);
		// var captcha = btn.closest('form').querySelector('.js-form-site-captcha');

		// if(response.length == 0) {
		// 	var errorMsg = generateError('Пройдите проверку');
		// 	captcha.classList.add('error');
		// 	captcha.append(errorMsg);
		// }

		if(form.querySelectorAll('.error').length === 0){
			let url = form.getAttribute('action');
			const formData=new FormData(form);
			formData.append('web_form_submit', 'Отправить');

			sendForm(url, formData, function(){
				form.reset();
			});

		}
	};
});

var successTitle = document.querySelector('.js-success-alert-title').innerHTML;
var successText = document.querySelector('.js-success-alert-text').innerHTML;

document.addEventListener('openSuccessPopupForm',function(e){
	let curSuccessTitle = e.target.activeElement.closest('.js-valid-form').getAttribute('data-title');
	let curSsuccessText = e.target.activeElement.closest('.js-valid-form').getAttribute('data-text');

	if(curSuccessTitle){
		document.querySelector('.js-success-alert-title').innerHTML = curSuccessTitle;
	}else{
		document.querySelector('.js-success-alert-title').innerHTML = successTitle;
	}

	if(curSsuccessText){
		document.querySelector('.js-success-alert-text').innerHTML = curSsuccessText;
	}else{
		document.querySelector('.js-success-alert-text').innerHTML = successText;
	}

	Fancybox.close();
	Fancybox.show([{ src: "#msg-success", type: "inline" }]);
});

async function sendForm(url, data, functionSuccess){
	let response = await fetch(url,{
		method: 'POST',
		body: data
	});
	
	if (response.ok){
		let text = await response.text();
		let event = new Event("openSuccessPopupForm");
		document.dispatchEvent(event);
		functionSuccess();
	} else {
		alert("Ошибка HTTP: " + response.status);
	}
}
