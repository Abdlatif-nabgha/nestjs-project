import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {id: 1, name: 'John', email: 'john@gmail.com', role: 'ENGINEER'},
        {id: 2, name: 'Jane', email: 'jane@gmail.com', role: 'ADMIN'},
        {id: 3, name: 'Bob', email: 'bob@gmail.com', role: 'INTERN'},
        {id: 4, name: 'Alice', email: 'alice@gmail.com', role: 'ENGINEER'},
        {id: 5, name: 'Charlie', email: 'charlie@gmail.com', role: 'ADMIN'},
        {id: 6, name: 'David', email: 'david@gmail.com', role: 'INTERN'},
    ];

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        // error if role is not correct
        if (role && !['INTERN', 'ENGINEER', 'ADMIN'].includes(role.toUpperCase())) {
            throw new BadRequestException('Invalid role provided. Valid roles are: INTERN, ENGINEER, ADMIN');
        }
        
        if (role) {
            return this.users.filter(user => user.role.toLowerCase() === role.toLowerCase());
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        if(!user){
            throw new NotFoundException('User not found')
        }
        return user;
    }

    create(user: CreateUserDto) {
        const userByHighestId = [...this.users].sort((a, b) => b.id - a.id)[0];
        const newId = userByHighestId.id + 1;
        const newUser = {id: newId, ...user};
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updatedUser: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updatedUser };
            }
            return user;
        })
        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);
        if (!removedUser){
            throw new NotFoundException('User not found');
        }
        this.users = this.users.filter(user => user.id !== id);
        return removedUser;
    }

}
