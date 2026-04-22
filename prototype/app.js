(() => {
  const STORAGE_KEY = 'taskmgmt_prototype_v1';

  const state = {
    data: { boards: [] },
    currentBoardId: null,
    editingCardId: null,
  };

  const uid = (prefix) => `${prefix}_${(crypto.randomUUID && crypto.randomUUID()) || Math.random().toString(36).slice(2)}`;

  const loadState = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) state.data = JSON.parse(raw);
    } catch {
      state.data = { boards: [] };
    }
  };

  const saveState = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
  };

  const findBoard = (id) => state.data.boards.find((b) => b.id === id);
  const findList = (board, listId) => board.lists.find((l) => l.id === listId);
  const findCardLocation = (board, cardId) => {
    for (const list of board.lists) {
      const idx = list.cards.findIndex((c) => c.id === cardId);
      if (idx >= 0) return { list, idx, card: list.cards[idx] };
    }
    return null;
  };

  // ---------- Render ----------
  const viewBoards = document.getElementById('view-boards');
  const viewBoard = document.getElementById('view-board');
  const boardListEl = document.getElementById('board-list');
  const listContainer = document.getElementById('list-container');
  const breadcrumb = document.getElementById('breadcrumb');
  const breadcrumbTitle = document.getElementById('breadcrumb-title');
  const btnDeleteBoard = document.getElementById('btn-delete-board');
  const modal = document.getElementById('modal-card');
  const modalTitleDisplay = document.getElementById('modal-title-display');
  const modalTitleInput = document.getElementById('modal-title-input');
  const modalMemoInput = document.getElementById('modal-memo-input');

  const render = () => {
    if (state.currentBoardId) {
      const board = findBoard(state.currentBoardId);
      if (!board) {
        state.currentBoardId = null;
        return render();
      }
      viewBoards.hidden = true;
      viewBoard.hidden = false;
      breadcrumb.hidden = false;
      breadcrumbTitle.textContent = board.title;
      btnDeleteBoard.hidden = false;
      renderBoardDetail(board);
    } else {
      viewBoards.hidden = false;
      viewBoard.hidden = true;
      breadcrumb.hidden = true;
      btnDeleteBoard.hidden = true;
      renderBoardList();
    }
    renderModal();
  };

  const renderBoardList = () => {
    boardListEl.innerHTML = '';
    for (const board of state.data.boards) {
      const el = document.createElement('div');
      el.className = 'board-card';
      el.textContent = board.title;
      el.addEventListener('click', () => {
        state.currentBoardId = board.id;
        render();
      });
      boardListEl.appendChild(el);
    }
    const addEl = document.createElement('div');
    addEl.className = 'board-card new';
    addEl.textContent = '＋ 新規ボード';
    addEl.addEventListener('click', createBoard);
    boardListEl.appendChild(addEl);
  };

  const renderBoardDetail = (board) => {
    listContainer.innerHTML = '';
    for (const list of board.lists) {
      listContainer.appendChild(renderList(board, list));
    }
    const addBtn = document.createElement('button');
    addBtn.className = 'add-list-btn';
    addBtn.textContent = '＋ 列を追加';
    addBtn.addEventListener('click', () => createList(board));
    listContainer.appendChild(addBtn);
  };

  const renderList = (board, list) => {
    const wrap = document.createElement('div');
    wrap.className = 'list';
    wrap.dataset.listId = list.id;

    const header = document.createElement('div');
    header.className = 'list-header';
    const title = document.createElement('span');
    title.className = 'list-title';
    title.textContent = list.title;
    const del = document.createElement('button');
    del.className = 'list-delete';
    del.textContent = '×';
    del.title = 'リストを削除';
    del.addEventListener('click', () => deleteList(board, list));
    header.appendChild(title);
    header.appendChild(del);
    wrap.appendChild(header);

    const cardListEl = document.createElement('div');
    cardListEl.className = 'card-list';
    cardListEl.dataset.listId = list.id;
    for (const card of list.cards) {
      cardListEl.appendChild(renderCard(board, list, card));
    }

    cardListEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      cardListEl.classList.add('drag-over');
    });
    cardListEl.addEventListener('dragleave', () => {
      cardListEl.classList.remove('drag-over');
    });
    cardListEl.addEventListener('drop', (e) => {
      e.preventDefault();
      cardListEl.classList.remove('drag-over');
      const cardId = e.dataTransfer.getData('text/card-id');
      if (!cardId) return;
      const targetCardEl = e.target.closest('.card');
      const targetCardId = targetCardEl ? targetCardEl.dataset.cardId : null;
      moveCard(board, cardId, list.id, targetCardId);
    });

    wrap.appendChild(cardListEl);

    const addCardBtn = document.createElement('button');
    addCardBtn.className = 'list-add-card';
    addCardBtn.textContent = '＋ カードを追加';
    addCardBtn.addEventListener('click', () => createCard(board, list));
    wrap.appendChild(addCardBtn);

    return wrap;
  };

  const renderCard = (board, list, card) => {
    const el = document.createElement('div');
    el.className = 'card';
    el.draggable = true;
    el.dataset.cardId = card.id;

    const title = document.createElement('span');
    title.className = 'card-title';
    title.textContent = card.title;
    el.appendChild(title);

    const del = document.createElement('button');
    del.className = 'card-delete';
    del.textContent = '×';
    del.title = 'カードを削除';
    del.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteCard(board, list, card);
    });
    el.appendChild(del);

    el.addEventListener('click', () => openCardModal(card.id));

    el.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/card-id', card.id);
      e.dataTransfer.effectAllowed = 'move';
      el.classList.add('dragging');
    });
    el.addEventListener('dragend', () => el.classList.remove('dragging'));

    return el;
  };

  const renderModal = () => {
    if (!state.editingCardId) {
      modal.hidden = true;
      return;
    }
    const board = findBoard(state.currentBoardId);
    if (!board) return;
    const loc = findCardLocation(board, state.editingCardId);
    if (!loc) {
      state.editingCardId = null;
      modal.hidden = true;
      return;
    }
    modal.hidden = false;
    modalTitleDisplay.textContent = loc.card.title;
    modalTitleInput.value = loc.card.title;
    modalMemoInput.value = loc.card.memo || '';
  };

  // ---------- Actions ----------
  const createBoard = () => {
    const title = prompt('ボード名を入力してください');
    if (!title || !title.trim()) return;
    state.data.boards.push({ id: uid('b'), title: title.trim(), lists: [] });
    saveState();
    render();
  };

  const deleteBoard = () => {
    const board = findBoard(state.currentBoardId);
    if (!board) return;
    if (!confirm(`ボード「${board.title}」を削除します。よろしいですか？`)) return;
    state.data.boards = state.data.boards.filter((b) => b.id !== board.id);
    state.currentBoardId = null;
    saveState();
    render();
  };

  const createList = (board) => {
    const title = prompt('リスト名を入力してください');
    if (!title || !title.trim()) return;
    board.lists.push({ id: uid('l'), title: title.trim(), cards: [] });
    saveState();
    render();
  };

  const deleteList = (board, list) => {
    if (!confirm(`リスト「${list.title}」を削除します。配下のカードも削除されます。`)) return;
    board.lists = board.lists.filter((l) => l.id !== list.id);
    saveState();
    render();
  };

  const createCard = (board, list) => {
    const title = prompt('カード名を入力してください');
    if (!title || !title.trim()) return;
    list.cards.push({ id: uid('c'), title: title.trim(), memo: '' });
    saveState();
    render();
  };

  const deleteCard = (board, list, card) => {
    if (!confirm(`カード「${card.title}」を削除します。`)) return;
    list.cards = list.cards.filter((c) => c.id !== card.id);
    saveState();
    render();
  };

  const moveCard = (board, cardId, targetListId, beforeCardId) => {
    const loc = findCardLocation(board, cardId);
    if (!loc) return;
    const targetList = findList(board, targetListId);
    if (!targetList) return;
    loc.list.cards.splice(loc.idx, 1);
    let insertIdx = targetList.cards.length;
    if (beforeCardId) {
      const i = targetList.cards.findIndex((c) => c.id === beforeCardId);
      if (i >= 0) insertIdx = i;
    }
    targetList.cards.splice(insertIdx, 0, loc.card);
    saveState();
    render();
  };

  const openCardModal = (cardId) => {
    state.editingCardId = cardId;
    render();
    setTimeout(() => modalTitleInput.focus(), 0);
  };

  const closeCardModal = () => {
    state.editingCardId = null;
    render();
  };

  const saveCardModal = () => {
    const board = findBoard(state.currentBoardId);
    if (!board || !state.editingCardId) return;
    const loc = findCardLocation(board, state.editingCardId);
    if (!loc) return;
    const newTitle = modalTitleInput.value.trim();
    if (!newTitle) {
      alert('タイトルを入力してください');
      return;
    }
    loc.card.title = newTitle;
    loc.card.memo = modalMemoInput.value;
    saveState();
    closeCardModal();
  };

  const deleteCardFromModal = () => {
    const board = findBoard(state.currentBoardId);
    if (!board || !state.editingCardId) return;
    const loc = findCardLocation(board, state.editingCardId);
    if (!loc) return;
    if (!confirm(`カード「${loc.card.title}」を削除します。`)) return;
    loc.list.cards = loc.list.cards.filter((c) => c.id !== state.editingCardId);
    saveState();
    closeCardModal();
  };

  // ---------- Global events ----------
  document.getElementById('logo').addEventListener('click', (e) => {
    e.preventDefault();
    state.currentBoardId = null;
    render();
  });
  btnDeleteBoard.addEventListener('click', deleteBoard);

  document.getElementById('modal-close').addEventListener('click', closeCardModal);
  document.getElementById('modal-save').addEventListener('click', saveCardModal);
  document.getElementById('modal-delete').addEventListener('click', deleteCardFromModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeCardModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.editingCardId) closeCardModal();
  });

  loadState();
  render();
})();
