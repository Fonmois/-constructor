// Создание MASK для имени и телефона
import Inputmask from "inputmask";
const maskPhone = document.querySelector(".js-mask-phone")
const maskName = document.querySelector(".js-mask-name")

Inputmask({ "mask": "+7 (999)-999-99-99" }).mask(maskPhone);
Inputmask({ "mask": "a{1,64}", "placeholder": "" }).mask(maskName);

// Находим картинки и импуты constructor-images constructor-card
const checkboxs = document.querySelectorAll(".products-checkbox__input")
const pictures = document.querySelectorAll(".products-images__picture")

// checkbox проходим по элементам checkbox c помощью события change
checkboxs.forEach(element => {
    element.addEventListener("change", function (e) {
        const item = e.target.closest(".constructor-card__products-item")

        // Еаходим значения атрибутов атрибуты 
        const price = Number(item.dataset.productPrice)
        const itemId = item.dataset.productId

        const totalPriceElement = document.querySelector(".js-order-price")
        const totalPriceAttr = Number(totalPriceElement.dataset.totalPrice);

        const picture = [...pictures].filter(pic => pic.dataset.productId === itemId)
        picture[0].classList.add("checked")

        // Добовляем класс чекед
        if (element.checked === true) {
            picture[0].classList.add("checked");

            totalPriceElement.dataset.totalPrice = totalPriceAttr + price;
            const strTotalPrice = totalPriceElement.dataset.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            totalPriceElement.innerHTML = strTotalPrice;

        } else {
            picture[0].classList.remove("checked");

            totalPriceElement.dataset.totalPrice = totalPriceAttr - price;
            const strTotalPrice = totalPriceElement.dataset.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            totalPriceElement.innerHTML = strTotalPrice;
        }
    })
})

// Рассрочка
const installmentCheckbox = document.querySelector('#installment')
installmentCheckbox.addEventListener("change", (e) => {
    if (installmentCheckbox.checked === true) {
        inputCommentHidden.value = "Купить в рассрочку";
    } else {
        inputCommentHidden.value = "";
    }
})

// SELECT
import Choices from 'choices.js';
const defaultSelect = () => {
    const element = document.querySelector('.js-select');
    const choices = new Choices(element, {
        searchEnabled: false, placeholder: true
    });
};
defaultSelect();




// Находим форму
const form = document.querySelector("form")
// находим чекбокс рассрочки
const inputCommentHidden = form.querySelector(".comment")
// Находим все импуты
const inputs = form.querySelectorAll("input")
// Отменяем стандартную отправку формы
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Вкладываеми в объект поле формы и его значение
    let formData = new FormData(form);
    // Имитация ответа сервера
    const response = {
        ok: true,
    }

    if (response.ok) {
        // Открываем модальное окно при отправке на сервер
        document.getElementById("my-modal").classList.add("open");
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        // Отчищаем поля 
        inputs.forEach(input => input.value = "");
        checkboxs.forEach(checbox => {
            if (checbox.checked) {
                checbox.checked = false;
            }
        });
        // Отчищаем картинки
        pictures.forEach(picture => picture.classList.remove("checked"));
        installmentCheckbox.checked = false;

        const totalPriceElement = document.querySelector(".js-order-price")
        // Возвращаем изначальную цену из dataset атрибута 

        const strPrice = totalPriceElement.dataset.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        totalPriceElement.innerHTML = strPrice;

        // выводим текстовое сообщение с отправкой на экран
        for (const [key, value] of formData) {
            output.textContent += `${key}: ${value}\n`;
        }
    }
})

// MODAL-WINDOW
// закрыть модальное окно
document.getElementById('close-my-modal-btn').addEventListener("click", function () {
    document.getElementById("my-modal").classList.remove("open");
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
})

//закрыть модальное окно при нажатии Esc
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.getElementById("my-modal").classList.remove("open")
    }
});

//закрыть модальное окно при крике вне его
document.querySelector("#my-modal .modal__box").addEventListener('click', event => {
    event._isClickWithInModal = true
});

document.querySelector("#my-modal").addEventListener('click', event => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('open');
});