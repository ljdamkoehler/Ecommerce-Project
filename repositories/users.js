const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repositories')

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
    async create(attrs) {
        attrs.id = this.randomId();

        const salt = crypto.randomBytes(8).toString('hex');
        const buff = await scrypt(attrs.password, salt, 64)
        
        const records = await this.getAll();
        const record = {
            ...attrs,
            password: `${buff.toString('hex')}.${salt}`
        };
        records.push(record);
        await this.writeAll(records);
        return record;
     }

    async comparePasswords(saved, supplied) {
        const [hashed, salt] = saved.split('.');
        const buffSupplied = await scrypt(supplied, salt, 64);

        return hashed === buffSupplied.toString('hex');

     }

}

module.exports = new UsersRepository('users.json')
