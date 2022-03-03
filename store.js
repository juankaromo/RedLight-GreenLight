let store = {
    games: []
}

function getUser(user) {
    const result = store["games"].filter(game => game.user == user);
    return result.length > 0 ? result[0] : null;
}

function getUsersRanking() {
    const results = store["games"].filter(game => game.highscore != 0);
    return results.length > 0 ? results : null;
}

function createUser(data) {
    const exists = getUser(data);

    if (!exists) {
        const model = {
            user: data,
            score: 0,
            highscore: 0
        }

        store["games"].push(model);
        persistInLocalStore();
        return model.user;
    } else {
        return exists.user;
    }
}

function updateUser(data) {
    const model = getUser(data.user);

    const modelIndex = store["games"].findIndex(game => game.user === model.user);

    store["games"][modelIndex] = {
        ...model,
        ...data
    };

    persistInLocalStore();
    //router.push(store["games"]);
}

function deleteUser(user) {
    confirm("Delete this user?");
    store["games"] = store["games"].filter(game => game.user != user);
    persistInLocalStore();
    router.push("ranking");
}

function gameLeft(data) {
    const game = getUser(data[0]);
    game.score++;
    updateUser(game);
}

function gameRight(data) {
    const game = getUser(data[0]);
    game.score++;
}

function getRedLigthDuration() {
    return 3000;
}

function initLocalStorage() {
    const localStore = localStorage.getItem("store");

    if (localStore) {
        store = JSON.parse(localStore);
    } else {
        persistInLocalStore();
    }
}

function persistInLocalStore() {
    localStorage.setItem("store", JSON.stringify(store));
}

initLocalStorage();