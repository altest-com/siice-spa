const keys = [
    'corporations',
    'dependencies',
    'secondments',
    'positions'
];

export default function(store) {
    keys.forEach(key => {
        store.dispatch(`${key}/fetchItems`, {limit: 10000});
    });
}

