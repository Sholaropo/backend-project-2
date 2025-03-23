import { Branch } from "../models/branchModel";
import {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  getDocumentById,
} from "../repositories/firestoreRepository";

const COLLECTION = "branches";

/**
 * @description Get all branches.
 * @returns {Promise<Branch[]>}
 */
export const getAllBranches = async (): Promise<Branch[]> => {
  const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
    COLLECTION
  );

  return snapshot.docs.map((doc) => {
    const data: FirebaseFirestore.DocumentData = doc.data();
    return { id: doc.id, ...data } as Branch;
  });
};

/**
 * @description Get a single branch by ID.
 * @param {string} id - The ID of the branch to retrieve.
 * @returns {Promise<Branch>}
 * @throws {Error} If the branch with the given ID is not found.
 */
export const getBranchById = async (id: string): Promise<Branch> => {
  const doc: FirebaseFirestore.DocumentSnapshot = await getDocumentById(
    COLLECTION,
    id
  );
  if (!doc.exists) {
    throw new Error(`Branch with ID ${id} not found`);
  }
  const data: FirebaseFirestore.DocumentData | undefined = doc.data();
  return { id: doc.id, ...data } as Branch;
};

/**
 * @description Create a new branch.
 * @param {Partial<Branch>} branch - The branch data.
 * @returns {Promise<Branch>}
 */
export const createBranch = async (
  branch: Partial<Branch>
): Promise<Branch> => {
  const id: string = await createDocument(COLLECTION, branch);
  return { id, ...branch } as Branch;
};

/**
 * @description Update an existing branch.
 * @param {string} id - The ID of the branch to update.
 * @param {Partial<Branch>} branch - The updated branch data.
 * @returns {Promise<Branch>}
 * @throws {Error} If the branch with the given ID is not found.
 */
export const updateBranch = async (
  id: string,
  branch: Partial<Branch>
): Promise<Branch> => {
    await updateDocument(COLLECTION, id, branch);
    return { id, ...branch } as Branch;
};

/**
 * @description Delete a branch.
 * @param {string} id - The ID of the branch to delete.
 * @returns {Promise<void>}
 * @throws {Error} If the branch with the given ID is not found.
 */
export const deleteBranch = async (id: string): Promise<void> => {
  await deleteDocument(COLLECTION, id);
};
