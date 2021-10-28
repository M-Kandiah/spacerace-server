const authController = require('../../controllers/authController');
const User = require('../../models/userMon');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({send: mockSend, json: mockJson}));
const mockRes = {status: mockStatus};

describe('auth controller', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('create', () => {
        test('it creates a user with a 201 status code', async () => {
            let testData = {username: "testuser1", password: "pass123"};
            jest.spyOn(User, 'create')
                .mockResolvedValue(new User(testData));
            const mockReq = {body: testData};
            await authController.create(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith({ message: "User has been created successfully" });
        })
    });
    //fails
    describe('checkLogin', () => {
        test('it logs the user in with a 200 status code', async () => {
            let testData = {userName: "testuser1", passwordHash: "pass123"};
            jest.spyOn(User, 'checkLogin')
                .mockResolvedValue(new User(testData));
            const mockReq = {body: {
                userName: "testuser1",
                password: "pass123"
            }};
            await authController.checkLogin(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        });
    })
});