/**
 * @interface Branch
 * @description Represents a branch object.
 */
export type Branch = {
  id: string;
  name: string;
  address: string;
  phone: string;
};

const branches: Branch[] = [];

/**
 * @description Get all branches.
 * @returns {Promise<Branch[]>}
 */
export const getAllBranches = async (): Promise<Branch[]> => {
  return branches;
};

/**
 * @description Create a new branch.
 * @param {{ name: string; address: string; phone: string; }} branch - The branch data.
 * @returns {Promise<Branch>}
 */
export const createBranch = async (branch: {
  name: string;
  address: string;
  phone: string;
}): Promise<Branch> => {
  const newBranch: Branch = { id: Date.now().toString(), ...branch };

  branches.push(newBranch);
  return newBranch;
};

/**
 * @description Update an existing branch.
 * @param {string} id - The ID of the branch to update.
 * @param {{ name: string; address: string; phone: string; }} branch - The updated branch data.
 * @returns {Promise<Branch>}
 * @throws {Error} If the branch with the given ID is not found.
 */
export const updateBranch = async (
  id: string,
  branch: { name: string; address: string; phone: string }
): Promise<Branch> => {
  const index: number = branches.findIndex((i) => i.id === id);
  if (index === -1) {
    throw new Error(`Branch with ID ${id} not found`);
  }

  branches[index] = { id, ...branch };

  return branches[index];
};

/**
 * @description Delete a branch.
 * @param {string} id - The ID of the branch to delete.
 * @returns {Promise<void>}
 * @throws {Error} If the branch with the given ID is not found.
 */
export const deleteBranch = async (id: string): Promise<void> => {
  const index: number = branches.findIndex((i) => i.id === id);
  if (index === -1) {
    throw new Error(`Branch with ID ${id} not found`);
  }

  branches.splice(index, 1);
};
