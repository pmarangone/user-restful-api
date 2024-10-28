import {
  fetchUsers,
  fetchUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
} from "../services/user";
import User from "../models/user";

const mockUserInstance = {
  update: jest.fn(),
  destroy: jest.fn(),
};

jest.mock("../models/user");

describe("User Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetchUsers should return users", async () => {
    const mockUsers = [{ nome: "Patrick", email: "email@example.com" }, { nome: "Marangone", email: "readme@example.com" }];
    (User.findAll as jest.Mock).mockResolvedValue(mockUsers);

    const users = await fetchUsers({});
    expect(users).toEqual(mockUsers);

    // guarantee that the right parameters were used
    expect(User.findAll).toHaveBeenCalledWith({ where: {} });
  });

  it("should match based on filters", async () => {
    const filters = { idade: "10" };
    const mockFilteredUsers = [{ nome: "Alice and Bob", email: "email@example.com", idade: 10 }];
    (User.findAll as jest.Mock).mockResolvedValue(mockFilteredUsers);

    const users = await fetchUsers(filters);
    expect(users).toEqual(mockFilteredUsers);

    // guarantee that the right parameters were used
    expect(User.findAll).toHaveBeenCalledWith({
        where: {
            idade: 10
        },
    });
  });

  it("should return an empty array if no users are found", async () => {
      (User.findAll as jest.Mock).mockResolvedValue([]);

      const users = await fetchUsers({});

      expect(users).toEqual([]);
  });


  it("should return user by ID", async () => {
    const mockUser = { id: 1, nome: "Patrick", email: "email@example.com" };
    (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

    const user = await fetchUserById("1");

    expect(user).toEqual(mockUser);
  });

  it("should create a new user", async () => {
    const newUserData = { nome: "Patrick", email: "email@example.com" };
    const createdUser = { id: 1, ...newUserData };
    (User.create as jest.Mock).mockResolvedValue(createdUser);

    const user = await createNewUser(newUserData);

    expect(user).toEqual(createdUser);
  });

  it("should update a user by ID", async () => {
    const updatedData = { nome: "Patrick", email: "email@example.com" };
    (User.findByPk as jest.Mock).mockResolvedValue(mockUserInstance); 
    (mockUserInstance.update as jest.Mock).mockResolvedValue({ ...mockUserInstance, ...updatedData });

    const result = await updateUserById("1", updatedData); 

    expect(result).toEqual({ ...mockUserInstance, ...updatedData });
  });

  it("should delete a user by ID", async () => {
    (User.destroy as jest.Mock).mockResolvedValue(1); 
    (User.findByPk as jest.Mock).mockResolvedValue(mockUserInstance); 

    const result = await deleteUserById("1");

    expect(result.message).toBe("User deleted");
  });

  it("should return null if user is not found by ID", async () => {
    (User.findByPk as jest.Mock).mockResolvedValue(null);

    const user = await fetchUserById("1"); 
    expect(user).toBeNull();
  });

  /// ERRORS
  it("should throw an error if fetching users fails", async () => {
      const errorMessage = "Database";
      (User.findAll as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(fetchUsers({})).rejects.toThrow(errorMessage);
  });

  it("should throw an error if creating a user fails", async () => {
    const newUserData = { nome: "Patrick", email: "email@example.com" };
    (User.create as jest.Mock).mockRejectedValue(new Error("Creation failed"));

    await expect(createNewUser(newUserData)).rejects.toThrow("Creation failed");
  });

  it("should throw an error if updating a user fails", async () => {
    const updatedData = { nome: "Patrick" };
    (User.update as jest.Mock).mockRejectedValue(new Error("User not found"));

    await expect(updateUserById("1", updatedData)).rejects.toThrow("User not found");
  });

  it("should throw an error if deleting a user fails", async () => {
    (User.destroy as jest.Mock).mockRejectedValue(new Error("User not found"));

    await expect(deleteUserById("1")).rejects.toThrow("User not found");
  });
});


