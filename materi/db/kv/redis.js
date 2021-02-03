const redis = require('redis');
const { promisify } = require('util');
const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);

client.on('error', (error) => {
  console.error(error);
  client.end(true);
});

client.on('connect', () => {
  main();
});

async function main() {
  try {
    await setAsync('name1', 'budi');
    await setAsync('name2', 'azri');
    // const vall = await getAsync('name2');
    const arr = [];

    //simpan data
    for (let i = 1; i < 100; i++) {
      const val = await getAsync(`name${i}`);
      if (val === null) {
        await setAsync(`name${i}`, `berhasil${i}`);
        await setAsync(`alamat${i}`, `jakarta${i}`);
        await setAsync(`email${i}`, `@gmail.com${i}`);
        await setAsync(`notelp${i}`, `021${i}`);
        await setAsync(`bio${i}`, `doyan ngoding ${i}`);
        break;
      }
    }

    //get data
    for (let i = 1; i < 100; i++) {
      const name = await getAsync(`name${i}`);
      const alamat = await getAsync(`alamat${i}`);
      const email = await getAsync(`email${i}`);
      const notelp = await getAsync(`notelp${i}`);
      const bio = await getAsync(`bio${i}`);
      if (name !== null) {
        arr.push({ name, alamat, email, notelp, bio });
      } else {
        break;
      }
    }

    //delete data
    for (let i = 1; i < 10; i++) {
      await delAsync(`name${i}`);
      await delAsync(`alamat${i}`);
      await delAsync(`email${i}`);
      await delAsync(`notelp${i}`);
      await delAsync(`bio${i}`);
    }
    // eslint-disable-next-line prettier/prettier
    const test = JSON.stringify(arr);
    console.log(test);
    await delAsync('name1');
    // client.end(true);
  } catch (err) {
    console.error(err);
  }
}
