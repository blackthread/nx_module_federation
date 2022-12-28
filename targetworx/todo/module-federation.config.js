module.exports = {
  name: 'todo',
  exposes: {
    './Module': 'todo/src/app/remote-entry/entry.module.ts',
  },
};
