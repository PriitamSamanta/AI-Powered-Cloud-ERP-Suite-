import { PrismaClient, Employee } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const departments = [
    'IT',
    'HR',
    'Finance',
    'Marketing',
    'Operations',
];

const positions = [
    'Developer',
    'Manager',
    'Executive',
    'Analyst',
    'Team Lead',
];

async function main() {

    const employees: Employee[] = [];

    for (let i = 1; i <= 20; i++) {
        const user = await prisma.user.create({
            data: {
                email: `employee${i}@amdox.com`,
                password: '123456',
                role: 'employee',
            },
        });

        const employee = await prisma.employee.create({
            data: {
                name: faker.person.fullName(),
                email: `emp${i}@amdox.com`,
                phone: faker.phone.number(),
                position:
                    positions[
                    Math.floor(Math.random() * positions.length)
                    ],
                department:
                    departments[
                    Math.floor(Math.random() * departments.length)
                    ],
                salary:
                    [25000, 30000, 35000, 45000, 50000][
                    Math.floor(Math.random() * 5)
                    ],
                status: 'active',
                userId: user.id,
            },
        });

        employees.push(employee);
    }

    console.log('✅ Employees Created');


    for (const employee of employees) {
        for (let d = 0; d < 5; d++) {
            const date = new Date();
            date.setDate(date.getDate() - d);

            const statuses = [
                'present',
                'present',
                'present',
                'present',
                'absent',
                'leave',
            ];

            await prisma.attendance.create({
                data: {
                    employeeId: employee.id,
                    date,
                    status:
                        statuses[
                        Math.floor(Math.random() * statuses.length)
                        ],
                    workingHours:
                        Math.floor(Math.random() * 3) + 6,
                },
            });
        }
    }

    console.log('✅ Attendance Created');


    for (let i = 0; i < 20; i++) {
        const employee =
            employees[
            Math.floor(Math.random() * employees.length)
            ];

        await prisma.leave.create({
            data: {
                employeeId: employee.id,
                reason: faker.lorem.words(3),
                startDate: faker.date.recent(),
                endDate: faker.date.soon(),
                status:
                    ['approved', 'pending', 'rejected'][
                    Math.floor(Math.random() * 3)
                    ],
            },
        });
    }

    console.log('✅ Leaves Created');

    for (const employee of employees) {
        await prisma.payroll.create({
            data: {
                employeeId: employee.id,
                month: 'May 2026',
                basicSalary: employee.salary,
                bonus: 2000,
                deductions: 1000,
                netSalary:
                    employee.salary + 2000 - 1000,
                status: 'paid',
            },
        });
    }

    console.log('✅ Payroll Created');

    for (let i = 1; i <= 15; i++) {
        await prisma.income.create({
            data: {
                title: `Project Payment ${i}`,
                amount:
                    Math.floor(Math.random() * 50000) +
                    20000,
                customerName: faker.company.name(),
                paymentMethod: 'BANK',
                category: [
                    'SERVICE',
                    'CONSULTING',
                    'PROJECT',
                ][Math.floor(Math.random() * 3)],
                date: faker.date.recent(),
                description: 'Client payment',
            },
        });
    }

    console.log('✅ Income Created');

    for (let i = 1; i <= 20; i++) {
        await prisma.expense.create({
            data: {
                title: `Expense ${i}`,
                amount:
                    Math.floor(Math.random() * 15000) +
                    1000,
                vendorName: faker.company.name(),
                paymentMethod: 'BANK',
                category: [
                    'RENT',
                    'SALARY',
                    'SOFTWARE',
                    'TRAVEL',
                    'UTILITIES',
                    'MARKETING',
                ][Math.floor(Math.random() * 6)],
                date: faker.date.recent(),
                description: 'Business expense',
            },
        });
    }

    console.log('✅ Expenses Created');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });