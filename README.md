### Install
* clone
* `npm install`


### Prepare
Create file `./server/.env`  

Content:
```
PRISMA_ENDPOINT="https://eu1.prisma.sh/..."
PRISMA_SECRET="..."
APP_SECRET="..."
```


### Run
1. Change directory: `cd ./server`
2. Start local server: `npm dev` (you can now open a Playground at http://localhost:4000)
3. Change directory: `cd ..`
4. Start React app: `npm start`
5. Open browser: http://localhost:3000

## Database
* `npx prisma deploy` → deploy new schema
* `npx prisma seed` → seed Database
* `npx prisma seed --reset` → all data is deleted before executing the seed
