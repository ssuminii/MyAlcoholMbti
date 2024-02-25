// main 과 qna 변수에 각각의 문서(main과 qna section) 불러오기
const main = document.querySelector("#main");
const qna = document.querySelector("#qna");

// 질문지 답안 버튼으로 만드는 addAnswer() 함수
function addAnswer(answerText, qIdx){
    // index.html에서 div class = "answerBox" 선택
    var a = document.querySelector('.answerBox');
    // answer 변수를 버튼html로 만들기
    var answer = document.createElement('button');
    // answer을 classList에 넣어주고 answerList 생성
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    // fadeIn
    answer.classList.add('fadeIn');
    // answer버튼이 a에 소속될 수 있도록 (상속개념)
    a.appendChild(answer);
    answer.innerHTML = answerText;

    // 답안지를 클릭하면 다음 질문으로 넘어가기 (onclick 대신)
    answer.addEventListener("click", function(){
        // button 세개 다 사라지게 하기 (모두 선택)
        var children = document.querySelectorAll('.answerList');
        // 버튼 비활성화
        // 사용자가 버튼 하나만 눌러도 모든 버튼들이 사라짐
        for (let i = 0; i < children.length; i++) {
            children[i].disabled = true;
            // fadeOut
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        // 시간을 두고 답안지 사라지기
        setTimeout(() => {
            for (let i = 0; i < children.length; i++) {
                children[i].style.display = 'none'
            }
            goNext(++qIdx);
        }, 950)
    }, false);
}

// 질문
function goNext(qIdx){
    // index.html에서 div class = "qBox" 선택
    var q = document.querySelector('.qBox');
    // data.js q가 qBox 태그에 할당
    q.innerHTML = qnaList[qIdx].q;
    // 질문지 답안 버튼으로 만들기 여러개의 버튼이니까 반복문 사용
    // 답안이 세개면 세개가 나타남
    for(let i in qnaList[qIdx].a){
        // 답안지 순서
        addAnswer(qnaList[qIdx].a[i].answer, qIdx);
    }
}


// begin() 함수가 시작되면 main페이지 사라지고 qna페이지 나타나기
function begin(){
    // 1초동안 등장하고 사라짐 시간 중요
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    // main sectiom이 반쯤 꺼졌을때 qna section 나타남
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        // qna section 시작되고 main section 사라짐
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450)
        // begin() 함수가 끝날 때 쯤 goNext() 함수 호출
        // qnaList[0].q; 0에 해당하는 변수 만들기
        let qIdx = 0;
        goNext(qIdx);
    }, 450); // 1000이 1초
}