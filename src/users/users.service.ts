import { Injectable } from '@nestjs/common';

// this is a type for the user to be used in the service
export type User = {
    userId: number;
    username: string;
    password: string;
};

// FIXME: this is a mock data for the users, replace with a real database
const users: User[] = [
    {
        userId: 1,
        username: 'john',
        password: 'changeme',
    },
    {
        userId: 2,
        username: 'chris',
        password: 'secret',
    },
];

@Injectable()
export class UsersService {
    async findUserByName(username: string): Promise<User | undefined> {
        return users.find((user) => user.username === username);
    }
}
