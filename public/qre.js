'use strict';

const API_URL = 'http://localhost:8080';

// DOM要素
const surveyForm = document.getElementById('survey-form');
const resultList = document.getElementById('result-list');
const submitAnswerButton = document.getElementById('submit-answer');
const refreshResultsButton = document.getElementById('refresh-results');

// アンケート回答を送信
submitAnswerButton.addEventListener('click', async () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        alert('回答を選択してください！');
        return;
    }

    const params = {
        method: 'POST',
        body: `answer=${selectedAnswer.value}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    try {
        const response = await fetch(`${API_URL}/submit-survey`, params);
        if (!response.ok) {
            throw new Error('回答の送信に失敗しました');
        }
        alert('回答を送信しました！');
    } catch (error) {
        console.error('Error:', error);
    }
});

// アンケート結果を取得
refreshResultsButton.addEventListener('click', async () => {
    const params = {
        method: 'POST',
        body: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    try {
        const response = await fetch(`${API_URL}/get-results`, params);
        if (!response.ok) {
            throw new Error('結果の取得に失敗しました');
        }
        const results = await response.json();
        updateResultList(results);
    } catch (error) {
        console.error('Error:', error);
    }
});

// 結果リストを更新
function updateResultList(results) {
    resultList.innerHTML = '';
    for (const [option, count] of Object.entries(results)) {
        const li = document.createElement('li');
        li.textContent = `${option}: ${count}票`;
        resultList.appendChild(li);
    }
}
