$(document).ready(function(){
		$('.carousel__inner').slick({
						autoplaySpeed: 1200,
						prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
						nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
						responsive: [
								{
									breakpoint: 992,
									settings: {
										dots: true,
										arrows: false,
									}
								},
								{
									breakpoint: 600,
									settings: {
										slidesToShow: 2,
										slidesToScroll: 2
									}
								},
								{
									breakpoint: 480,
									settings: {
										slidesToShow: 1,
										slidesToScroll: 1
									}
								}
								// You can unslick at a given breakpoint now by adding:
								// settings: "unslick"
								// instead of a settings object
							]
						
				}
		);

		//скрипт для табов 
		$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
				$(this)
					.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
					.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
		});

	 

		function toggleSlide(item) {
				$(item).each(function(i) {
						$(this).on('click', function(e) {
								e.preventDefault();
								$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
								$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
						})
				});
		}
		
		toggleSlide('.catalog-item__link');
		toggleSlide('.catalog-item__back');

		//modal
		$('[data-modal=consultation]').on('click', function() {
				$('.overlay, #consultation').fadeIn('slow');
		});

		$('.modal__close').on('click', function() {
				$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
		});

		$('.button_mini').each(function(i) {
				$(this).on('click', function() {
					$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
					$('.overlay, #order').fadeIn('slow');
				})
		})
		
		function validateForms(item) {
			$(item).validate({
				rules: {
					name: "required",
					email: {
						require: true,
						email: true
					},
					phone: "required",
				},
				messages: {
					name: "Пожалуйста, введите свое имя",
					email: {
						required: "Пожалуйста, введите свою почту",
						email: "Неправильно введен адрес почты"
					},
					phone: "Пожалуйста, введите свой номер телефона"
				}
		});
		}

		validateForms('#consultation-form');
		validateForms('#consultation form');
		validateForms('#order form');

		$('input[name=phone]').mask("+7 (999) 999-99-99");

		$('form').submit(function(e) {
				e.preventDefault();

				if (!$(this).valid()) {
					return;
				} 

				$.ajax({
					type: "POST",
					url: "mailer/smart.php",
					data: $(this).serialize()
				}).done(function() {
					$(this).find("inpit").val("");
					$('#consultation, #order').fadeOut('slow');
					$('.overlay, #thanks').fadeIn('slow');

					$('form').trigger('reset');
				});
				return false;
		});

		//smooth scroll and pageup
		$(window).scroll(function() {
				if ($(this).scrollTop() > 1600) {
						$('.pageup').fadeIn('slow');
				} else {
						$('.pageup').fadeOut('slow');
				}
		});

		$("a[href=#up]").click(function () {
				const _href = $(this).attr("href");
				$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
				return false;
		});

		new WOW().init();
	});

