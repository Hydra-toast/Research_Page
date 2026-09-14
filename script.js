'use strict';
const examples = {
  lignin: { name: '리그닌 탄소섬유', brief: '리그닌으로 탄소섬유 만드는 것 좀 찾아보고, 우리 랩에서 할 수 있을지 알아봐.', scope: '리그닌 탄소섬유의 제조 방법과 실험에 필요한 조건', titles: ['리그닌 탄소섬유의 전체 공정 이해', '방사 방법별 제조 조건 비교', '섬유 성능을 개선하는 최근 접근'], reasons: ['원료부터 안정화·탄화까지 살펴보며, 낯선 용어와 공정 흐름을 이해할 수 있어요.', '사용한 재료와 방사 조건을 비교하며, 어떤 장비가 필요한지 살펴볼 수 있어요.', '기존 방법의 한계와 개선 방향을 알아보고, 다음 조사 범위를 좁힐 수 있어요.'] },
  battery: { name: '전고체 전지', brief: '전고체 전지에서 전해질 계면 저항을 줄이는 방법을 좀 찾아봐.', scope: '전고체 전지의 계면 문제와 저항을 줄이는 접근법', titles: ['전고체 전지의 계면 문제 이해', '계면 처리 방법과 측정 조건 비교', '계면 안정성을 개선하는 최근 접근'], reasons: ['전해질과 전극의 경계에서 어떤 문제가 생기는지 먼저 이해할 수 있어요.', '처리 방식과 저항 측정 조건을 함께 보며, 비교할 기준을 찾을 수 있어요.', '기존 계면 처리의 한계를 어떻게 다루는지 살펴볼 수 있어요.'] },
  solar: { name: '페로브스카이트', brief: '페로브스카이트 태양전지 안정성을 개선하는 방법을 찾아봐.', scope: '페로브스카이트 태양전지의 안정성과 개선 방법', titles: ['태양전지 안정성의 주요 개념 이해', '안정성 평가와 처리 방법 비교', '열화 문제를 줄이는 최근 접근'], reasons: ['성능 저하 요인과 안정성 평가 개념을 먼저 파악할 수 있어요.', '보관·구동·측정 조건을 함께 보며 결과를 비교할 기준을 세울 수 있어요.', '최근 연구에서 해결하려는 열화 문제와 남은 한계를 살펴볼 수 있어요.'] },
  general: { name: '입력한 과제', brief: '', scope: '과제의 배경, 주요 방법, 최근 연구에서 확인할 내용을 살펴보기', titles: ['배경과 용어를 정리하는 입문 리뷰', '주요 접근법을 보여주는 대표 연구', '기존 한계를 다루는 최근 연구'], reasons: ['새로운 분야의 핵심 개념과 전체 흐름을 이해하는 데 필요한 역할입니다.', '사용한 조건과 비교 기준을 알아보고 구체적인 접근법을 이해하는 데 필요한 역할입니다.', '아직 풀리지 않은 문제와 후속 조사 방향을 살펴보는 데 필요한 역할입니다.'] }
};
const roles = ['배경을 잡는 리뷰', '방법을 보는 대표 연구', '변화를 보는 최근 연구'];
const positions = ['공정·개념 개요 → 비교표 → 한계', '실험 방법 → 결과 그림·표 → 조건', '연구 질문 → 개선 결과 → 한계'];
let currentKey = 'lignin';
const selected = new Set();
const brief = document.querySelector('#brief');
const papers = document.querySelector('#papers');
const tabs = [...document.querySelectorAll('[role="tab"]')];
function activateTab(index, focus = false) {
  tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; document.getElementById(tab.getAttribute('aria-controls')).hidden = i !== index; });
  if (focus) tabs[index].focus();
  if (index === 1) document.querySelector('#prepared-description').textContent = selected.size ? `선택한 ${selected.size}개 논문 역할을 바탕으로 보는 구성 예시입니다. 실제 요약·분석은 연결되지 않았습니다.` : '구조 예시입니다. 실제 논문 요약과 분석은 유료 기능으로 제공할 예정입니다.';
}
tabs.forEach((tab, i) => { tab.addEventListener('click', () => activateTab(i)); tab.addEventListener('keydown', event => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) { event.preventDefault(); activateTab(event.key === 'Home' ? 0 : event.key === 'End' ? 1 : 1 - i, true); } }); });
function updateSelection() {
  document.querySelector('#selection-status').textContent = selected.size ? `${selected.size}개 선택 · 자료 구성 예시를 확인할 수 있어요.` : '발표에 활용할 논문을 골라보세요.';
  document.querySelector('#prepare-button').disabled = selected.size === 0;
}
function renderPapers() {
  const sample = examples[currentKey]; papers.replaceChildren();
  const order = document.querySelector('#methods-first').checked ? [1, 0, 2] : [0, 1, 2];
  order.forEach(i => {
    const card = document.createElement('article'); card.className = 'paper-card'; card.classList.toggle('selected', selected.has(i));
    const category = document.createElement('span'); category.className = 'paper-category'; category.textContent = roles[i];
    const title = document.createElement('h4'); title.textContent = sample.titles[i];
    const type = document.createElement('div'); type.className = 'paper-type'; type.textContent = '논문 역할 예시 · 실제 서지정보 아님';
    const why = document.createElement('h5'); why.textContent = '왜 먼저 볼까요?';
    const reason = document.createElement('p'); reason.textContent = sample.reasons[i];
    const from = document.createElement('div'); from.className = 'read-from'; const label = document.createElement('b'); label.textContent = '먼저 확인할 부분'; from.append(label, document.createTextNode(positions[i]));
    const button = document.createElement('button'); button.type = 'button'; button.setAttribute('aria-pressed', String(selected.has(i))); button.setAttribute('aria-label', sample.titles[i] + ' 선택'); button.textContent = selected.has(i) ? '✓ 선택했어요' : '+ 이 논문으로 준비하기';
    button.addEventListener('click', () => { selected.has(i) ? selected.delete(i) : selected.add(i); card.classList.toggle('selected', selected.has(i)); button.setAttribute('aria-pressed', String(selected.has(i))); button.textContent = selected.has(i) ? '✓ 선택했어요' : '+ 이 논문으로 준비하기'; updateSelection(); });
    card.append(category, title, type, why, reason, from, button); papers.append(card);
  }); updateSelection();
}
function loadTopic(text, key) {
  currentKey = key; selected.clear(); brief.value = text;
  document.querySelector('#scope-text').textContent = examples[key].scope;
  document.querySelector('#brief-caption').textContent = `입력: ${text} · ${key === 'general' ? '일반 구성 예시' : examples[key].name + ' 주제 예시'} · 실제 검색 결과 아님`;
  document.querySelector('#presentation-topic').textContent = text || examples[key].scope;
  document.querySelector('#scope-input').value = ''; document.querySelector('#methods-first').checked = false;
  document.querySelector('#scope-editor').hidden = true; document.querySelector('#adjust-button').setAttribute('aria-expanded', 'false');
  renderPapers(); activateTab(0);
}
function inferExample(text) { return /리그닌|lignin/i.test(text) ? 'lignin' : /전고체|배터리|battery/i.test(text) ? 'battery' : /페로브스카이트|태양전지|perovskite/i.test(text) ? 'solar' : 'general'; }
document.querySelectorAll('[data-example]').forEach(button => button.addEventListener('click', () => { brief.value = examples[button.dataset.example].brief; brief.setCustomValidity(''); brief.focus(); }));
document.querySelector('#brief-form').addEventListener('submit', event => {
  event.preventDefault(); const text = brief.value.trim(); if (!text) { brief.setCustomValidity('기억나는 주제나 표현을 적어주세요.'); brief.reportValidity(); return; }
  loadTopic(text, inferExample(text)); const url = new URL(location.href); url.searchParams.set('topic', text); url.hash = 'preview';
  try { history.replaceState(null, '', url); } catch { /* File previews may restrict history changes. */ }
  document.querySelector('#preview').scrollIntoView(); tabs[0].focus({preventScroll:true});
});
brief.addEventListener('input', () => brief.setCustomValidity(''));
document.querySelector('#adjust-button').addEventListener('click', event => { const editor = document.querySelector('#scope-editor'); editor.hidden = !editor.hidden; event.currentTarget.setAttribute('aria-expanded', String(!editor.hidden)); if (!editor.hidden) document.querySelector('#scope-input').focus(); });
document.querySelector('#scope-editor').addEventListener('submit', event => { event.preventDefault(); const adjustment = document.querySelector('#scope-input').value.trim(); document.querySelector('#scope-text').textContent = adjustment ? `추가 요청: ${adjustment}` : examples[currentKey].scope; renderPapers(); document.querySelector('#scope-editor').hidden = true; document.querySelector('#adjust-button').setAttribute('aria-expanded', 'false'); document.querySelector('#adjust-button').focus(); });
document.querySelector('#prepare-button').addEventListener('click', () => activateTab(1, true));
document.querySelector('#paid-preview').addEventListener('click', () => { activateTab(1); document.querySelector('#preview').scrollIntoView(); tabs[1].focus({preventScroll:true}); });
document.querySelector('#copy-button').addEventListener('click', async () => {
  const text = `랩미팅 발표 목차 — 구성 예시\n\n조사 주제: ${document.querySelector('#presentation-topic').textContent}\n\n1. 조사 주제와 범위\n2. 주요 접근법과 조건 비교\n3. 결과와 한계\n4. 우리 랩에서 확인할 사항\n\n각 장에 연결할 정보: 핵심 주장 / 실제 논문 출처와 원문 위치 / 실험 조건 / 확인하지 못한 부분\n\n실제 논문 요약이 아닙니다. 발표에 사용할 수치·조건·결론은 원문에서 확인하세요.`;
  try { await navigator.clipboard.writeText(text); document.querySelector('#copy-status').textContent = '발표 목차를 복사했어요. PPT 도구에 붙여넣어 보세요.'; } catch { const fallback = document.querySelector('#copy-fallback'); fallback.hidden = false; fallback.value = text; fallback.focus(); fallback.select(); document.querySelector('#copy-status').textContent = '아래 내용을 선택했어요. 복사 메뉴 또는 Ctrl+C를 이용하세요.'; }
});
const topic = new URLSearchParams(location.search).get('topic');
if (topic && topic.trim()) loadTopic(topic.slice(0,1600), inferExample(topic)); else renderPapers();

// The hero preview demonstrates how the same paper supports different questions.
document.querySelectorAll('[data-reading]').forEach(button=>button.addEventListener('click',()=>{
 const method=button.dataset.reading==='method';
 document.querySelectorAll('[data-reading]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 document.getElementById('excerpt-method').classList.toggle('is-muted',!method);
 document.getElementById('excerpt-limit').classList.toggle('is-muted',method);
 document.getElementById('annotation-title').textContent=method?'이 부분부터 읽는 이유':'이 한계를 확인하는 이유';
 document.getElementById('annotation-copy').textContent=method?'우리 랩의 원료·장비와 비교할 조건이 담겨 있어요.':'논문의 결과를 우리 랩에 그대로 적용할 수 있는지는 아직 알 수 없어요.';
 document.getElementById('takeaway-copy').textContent=method?'논문의 제조 조건과 우리 랩에서 가능한 조건을 나란히 비교':'원료·장비가 달라질 때 추가로 확인해야 할 점 정리';
}));
