const startButton = document.getElementById('start-btn')//bắt sự kiện bắt đầu game
const nextButton = document.getElementById('next-btn')//bắt sự kiện chuyển câu
const questionContainerElement = document.getElementById('question-container')//sự kiện hiển thị câu hỏi
const questionElement = document.getElementById('question')//sự kiện lấy câu hỏi
const answerButtonsElement = document.getElementById('answer-buttons')//sự kiện lấy đáp án từ nút

let shuffledQuestions, currentQuestionIndex //chạy sự kiện trộn và lấy câu hỏi hiện tại

startButton.addEventListener('click', startGame)//chạy sự kiện khi bắt sự kiện click để bắt đầu game
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

 //hàm chạy game
function startGame() { 
  startButton.classList.add('hide')//ẩn câu hỏi khi vừa vào game
  shuffledQuestions = questions.sort(() => Math.random() - .5)//trộn và hiển thị câu hỏi ngẫu nhiên
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')//hiện câu hỏi 
  setNextQuestion()
}

function setNextQuestion() {
  resetState()//trả lại trạng thái ban đầu
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {//hàm hiện câu hỏi
  questionElement.innerText = question.question//lấy đoạn nội dung sao cho giống nhất
  question.answers.forEach(answer => {//hiệu chỉnh cho mỗi câu trả lời
    const button = document.createElement('button')//tạo nút bấm
    button.innerText = answer.text//hiện nd bên trong nút
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)//bắt sự kiện click trên nút
    answerButtonsElement.appendChild(button)//chèn một nút vào phía cuối cùng của phần tử
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'HTML có phải là một ngôn ngữ lập trình?',
    answers: [
      { text: 'Không', correct: true },
      { text: 'Có', correct: false }
    ]
  },
  {
    question: 'Khoảng cách từ văn bản đến biên là thuộc tính: ',
    answers: [
      { text: 'Padding', correct: true },
      { text: 'Margin', correct: false },
      { text: 'Border', correct: false },
      { text: 'Width', correct: false }
    ]
  },
  {
    question: 'CSS là viết tắt của?',
    answers: [
      { text: 'Cascader Style Sheet', correct: false },
      { text: 'Cascading Style Sheet', correct: true },
      { text: 'Cascading Styles Sheet', correct: false },
      { text: 'Cascading Style Sheets', correct: false }
    ]
  },
  {
    question: 'Ghi chú trong CSS là?',
    answers: [
      { text: 'Cặp dấu "/" "/"', correct: false },
      { text: 'Cặp dấu "/*" "/*"', correct: false },
      { text: 'Cặp dấu "!--" "--"', correct: false },
      { text: 'Cặp dấu "/*" "*/"', correct: true }
    ]
  },
  {
    question: 'Đâu không phải là lệnh lặp của Javascript? ',
    answers: [
      { text: 'Lệnh do-while', correct: true },
      { text: 'Lệnh for', correct: false },
      { text: 'Lệnh for-in', correct: false },
      { text: 'Lệnh while', correct: false }
    ]
  },
  {
    question: 'Đâu không phải là phương thức chuỗi? ',
    answers: [
      { text: 'toLowerCase()', correct: false },
      { text: 'concat(<string>)', correct: false },
      { text: 'filter()', correct: true },
      { text: 'charAt(<index>)', correct: false }
    ]
  },
  {
    question: 'Jquery có mấy hiệu ứng làm mờ? ',
    answers: [
      { text: '4', correct: true },
      { text: '8', correct: false },
      { text: '3', correct: false },
      { text: '6', correct: false }
    ]
  },
  {
    question: 'Jquery có bao nhiêu sự kiện thông dụng? ',
    answers: [
      { text: '2', correct: false },
      { text: '3', correct: false },
      { text: '4', correct: true },
      { text: '5', correct: false }
    ]
  },
  {
    question: 'Cú pháp nào dùng để lấy con trực tiếp của thành phần div trong CSS? ',
    answers: [
      { text: 'div span', correct: false },
      { text: 'div + p', correct: false },
      { text: 'div.span', correct: false },
      { text: 'div > span', correct: true }
    ]
  },
  {
    question: 'Đâu là phát biểu sai?',
    answers: [
      { text: 'Thẻ <img> không có thẻ đóng', correct: false },
      { text: 'Thẻ <iframe> dùng để tạo một frame nằm trong (inline)', correct: false },
      { text: 'Các thẻ meta luôn nằm trong <head></head', correct: false },
      { text: '<Cặp thẻ <p></p> dùng để hiển thị văn bản thành từng dòng văn bản khác nhau ', correct: true }
    ]
  },
  {
    question: 'Danh sách các tên tham số trong định nghĩa hàm là gì? ',
    answers: [
      { text: 'Đối số', correct: false },
      { text: 'Tham số', correct: true },
      { text: 'Cả 2 đều đúng', correct: false },
      { text: 'Cả 2 đều sai', correct: false }
    ]
  },
]

//getElementById() -> lấy phần tử theo tên id
//getElementsByName() -> lấy phần tử theo tên, chính là thuộc tính name trong thẻ
//getElementsByTagName() -> lấy phần tử theo tên thẻ HTML