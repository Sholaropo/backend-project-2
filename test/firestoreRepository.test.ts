jest.mock("../firebase-service-account.ci.json", () => ({
    type: "service_account",
    project_id: "backend-project-f49cd",
     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCpyF3q3MfCjxJF\nfs4C92nod/zFhCR2wUY0QmLB0PIASh8GazzMZtb3yw/PFaBh278Un8z4gY6uIQxH\nrSg2w+jjqdSP4RhR2RUNlZtySJOITkgcQ/VwdS8CHmz22FLDh6aMOKyfVGUuDIre\n4JG0F5mRHQhhS67h1RPmUjbF/KxzZft5Yw5/kax8rLxl9k6hH5y/LYDpBgNgHMSc\nDr1Q0yiwQXOvB4mU7w+AxWEBoW83Wdo0/IPJeoWVocGxitm2iO86uvl0uYuF1Hjg\nEOyGV//kXi8P2Ac5+d41AcPLhH41UDShpnX6vgcefocVfpXl0l5ffcHKGYDCnGSv\nvqnvPK3PAgMBAAECggEAInNHq0pVNkM1n+hVAQEW+laucZ2YkIgzKJN32n/9OtXP\nacwEsC0F3Y3UjV6EBpdCNHsgaiRPwUFvbnPSPxqNfPSO7wrrlmAIB5Od0Ris5vGL\nbEDV4pXEjheCYKwQTyCNSNKPJF1Jkoh0/ThwGCzZujo74xIqUCSePxPbjVzx2RA5\nVh6fnk0usI6i8mkYwXxUIx5gzp74iBG3b/H717UrUy3EoQ3kR5bIWSsK6GX/933C\n1x9OvAHNQmTe+D0jLD2eBD0dhDEtCKWcR7UhXolZDiCiqSa3x/zI0whr33Af/pLL\npFpyCtKcifdDmuKypwARoVLWTxYFyusnTOVHBlI9MQKBgQDoWI/ckIt94tdMAMVW\nV38bbc5MjM51FDsFcxWAPy1rraKk7HoBuZRWMch7vMbVoxI3OOs4ToNOxQfnDrsZ\nblOlgDrYcrxZ5e5w9NZCLBk4mLwfbVOdoThd1XC3O2NkyDev25qZYdEFHiH0poxP\nERSKLypfWSIEpObpjfGyq/AgXQKBgQC7EUVbzlvoL4ronfFD2xry6NQ2sIpttCP6\nzmOzZEDX1uZFaEtIEakJx1tgy1LzQp9MpWWKQHiEn6mTO1rBN9RfmbanC/Ke5ZMo\nHqQGVxzdtraRRniJMXuHE4BIg2x1brx0xe3caz/0F1AHUppirH42HHMeBk9Kgd97\nhB+rdcoUGwKBgDYkrSGQ7XCgc9taMqI0MYKKzBA6n8HYvQhAETqZflQhWk1kbeoI\n/PA5Gab8DrmqDoyfzvCIG0E32OeXHzKF6ygeAZh+5DVux2m7JFK3RAlUTkJkj5+j\n+iajnmiUhkzt+0wXuKcVjEfNBcylIv0p1cd9xjoB41OBue2jDje8qXBhAoGAatVu\nOwQbUPr15ettwkb7mQaHS8R/Ci/67F26atUygxHj6HerprkPRNppwVndQbgmqes7\nlj1DltpoSgF3zylHTGHJApW8Nir+Y8c7/bL6dVTH5yfL5u4vkfD9LmyAIIDhd/8h\n3OQTXh+CQOxX50qDuft9cwQ/fFm3fB70x0M56UkCgYBdEy4+sWklkx2618/ekJJc\n4pBpu00g5PtwdnpyWhIHjEpvBE+pFl1klEJtgZRnN0l1pZ9DuypwprEXJn2snhsW\n/8OUJdTueL53ToVhUWSL3wgXrHnb7jqpqx/yPmTkjxsBXRbJS/ia7GuiBZmqdSjr\nO1oU+d5Ndr63JwT2HE/OoA==\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-fbsvc@backend-project-f49cd.iam.gserviceaccount.com",
}));

import {
    runTransaction,
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
    deleteDocumentsByFieldValues,
} from "../src/api/v1/repositories/firestoreRepository";
import {
    mockFirestoreCollection,
    mockFirestoreQuery,
    mockFirestoreTransaction,
    MockFirestoreCollection,
    MockFirestoreQuery,
} from "./utils/mockFirebaseHelper";

jest.mock("../config/firebaseConfig", () => ({
    __esModule: true,
    default: {
        collection: jest.fn(),
        runTransaction: jest.fn(),
        batch: jest.fn(),
    },
}));

import db from "../config/firebaseConfig";

describe("Firestore Repository", () => {
    const mockCollectionName: string = "testCollection";
    const mockDocId: string = "mockDocId";
    const mockData: { id: string; name: string; value: number } = {
        id: mockDocId,
        name: "Test Document",
        value: 42,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("runTransaction", () => {
        it("should execute a transaction successfully", async () => {
            const mockOperation: jest.Mock = jest
                .fn()
                .mockResolvedValue("success");
            (db.runTransaction as jest.Mock).mockImplementation(
                async (callback) => {
                    return await callback(mockFirestoreTransaction);
                }
            );

            const result: unknown = await runTransaction(mockOperation);

            expect(result).toBe("success");
            expect(mockOperation).toHaveBeenCalled();
        });

        it("should throw a Error if transaction fails", async () => {
            (db.runTransaction as jest.Mock).mockRejectedValue(
                new Error("Transaction failed")
            );

            await expect(runTransaction(jest.fn())).rejects.toThrow(Error);
        });
    });

    describe("createDocument", () => {
        it("should create a document with generated ID", async () => {
            const collectionRef: MockFirestoreCollection =
                mockFirestoreCollection(mockData);
            (db.collection as jest.Mock).mockReturnValue(collectionRef);

            const result: string = await createDocument(
                mockCollectionName,
                mockData
            );

            expect(result).toBe(mockDocId);
            expect(collectionRef.add).toHaveBeenCalledWith(mockData);
        });

        it("should create a document with provided ID", async () => {
            const collectionRef: MockFirestoreCollection =
                mockFirestoreCollection(mockData, mockDocId);
            (db.collection as jest.Mock).mockReturnValue(collectionRef);

            const result: string = await createDocument(
                mockCollectionName,
                mockData,
                mockDocId
            );

            expect(result).toBe(mockDocId);
            expect(collectionRef.doc().set).toHaveBeenCalledWith(mockData);
        });

        it("should throw a Error if creation fails", async () => {
            const collectionRef: MockFirestoreCollection =
                mockFirestoreCollection(mockData);
            collectionRef.add.mockRejectedValue(new Error("Creation failed"));
            (db.collection as jest.Mock).mockReturnValue(collectionRef);

            await expect(
                createDocument(mockCollectionName, mockData)
            ).rejects.toThrow(Error);
        });
    });

    describe("getDocuments", () => {
        it("should return all documents from a collection", async () => {
            const mockDocs: {
                id: string;
                name: string;
                value: number;
            }[] = [mockData, { ...mockData, id: "mockDocId2" }];
            const queryRef: MockFirestoreQuery = mockFirestoreQuery(mockDocs);
            (db.collection as jest.Mock).mockReturnValue(queryRef);

            const result: FirebaseFirestore.QuerySnapshot = await getDocuments(
                mockCollectionName
            );

            expect(result.docs).toHaveLength(mockDocs.length);
            expect(result.docs[0].data()).toEqual(mockDocs[0]);
        });

        it("should throw a Error if retrieval fails", async () => {
            const queryRef: MockFirestoreQuery = mockFirestoreQuery([]);
            queryRef.get.mockRejectedValue(new Error("Retrieval failed"));
            (db.collection as jest.Mock).mockReturnValue(queryRef);

            await expect(getDocuments(mockCollectionName)).rejects.toThrow(
                Error
            );
        });
    });

    describe("getDocumentById", () => {
        it("should return a document by ID", async () => {
            const collectionRef: MockFirestoreCollection =
                mockFirestoreCollection(mockData, mockDocId);
            (db.collection as jest.Mock).mockReturnValue(collectionRef);

            const result: FirebaseFirestore.DocumentSnapshot | null =
                await getDocumentById(mockCollectionName, mockDocId);

            expect(result!.data()).toEqual(mockData);
        });

        it("should throw an error if document doesn't exist", async () => {
            const collectionRef: MockFirestoreCollection =
                mockFirestoreCollection({}, mockDocId);
            collectionRef.doc().get.mockResolvedValue({ exists: false });
            (db.collection as jest.Mock).mockReturnValue(collectionRef);

            // Use async/await with expect to catch the thrown error
            await expect(
                getDocumentById(mockCollectionName, mockDocId)
            ).rejects.toThrow(
                `Document not found in collection ${mockCollectionName} with id ${mockDocId}`
            );
        });

        it("should throw a Error if retrieval fails", async () => {
            const collectionRef: MockFirestoreCollection =
                mockFirestoreCollection(mockData, mockDocId);
            collectionRef
                .doc()
                .get.mockRejectedValue(new Error("Retrieval failed"));
            (db.collection as jest.Mock).mockReturnValue(collectionRef);

            await expect(
                getDocumentById(mockCollectionName, mockDocId)
            ).rejects.toThrow(Error);
        });
    });

    describe("updateDocument", () => {
        it("should update a document", async () => {
            const collectionRef: MockFirestoreCollection =
                mockFirestoreCollection(mockData, mockDocId);
            (db.collection as jest.Mock).mockReturnValue(collectionRef);

            await updateDocument(mockCollectionName, mockDocId, { value: 43 });

            expect(collectionRef.doc().update).toHaveBeenCalledWith({
                value: 43,
            });
        });

        it("should throw a Error if update fails", async () => {
            const collectionRef: MockFirestoreCollection =
                mockFirestoreCollection(mockData, mockDocId);
            collectionRef
                .doc()
                .update.mockRejectedValue(new Error("Update failed"));
            (db.collection as jest.Mock).mockReturnValue(collectionRef);

            await expect(
                updateDocument(mockCollectionName, mockDocId, { value: 43 })
            ).rejects.toThrow(Error);
        });
    });

    describe("deleteDocument", () => {
        it("should delete a document", async () => {
            const collectionRef: MockFirestoreCollection =
                mockFirestoreCollection(mockData, mockDocId);
            (db.collection as jest.Mock).mockReturnValue(collectionRef);

            await deleteDocument(mockCollectionName, mockDocId);

            expect(collectionRef.doc().delete).toHaveBeenCalled();
        });

        it("should throw a Error if deletion fails", async () => {
            const collectionRef: MockFirestoreCollection =
                mockFirestoreCollection(mockData, mockDocId);
            collectionRef
                .doc()
                .delete.mockRejectedValue(new Error("Deletion failed"));
            (db.collection as jest.Mock).mockReturnValue(collectionRef);

            await expect(
                deleteDocument(mockCollectionName, mockDocId)
            ).rejects.toThrow(Error);
        });
    });

    describe("deleteDocumentsByFieldValues", () => {
        it("should delete documents by field values", async () => {
            const mockDocs: {
                id: string;
                field1: string;
                field2: string;
            }[] = [
                { id: "doc1", field1: "value1", field2: "value2" },
                { id: "doc2", field1: "value1", field2: "value2" },
            ];
            const queryRef: MockFirestoreQuery = mockFirestoreQuery(mockDocs);
            (db.collection as jest.Mock).mockReturnValue(queryRef);
            const batchMock: { commit: jest.Mock; delete: jest.Mock } = {
                commit: jest.fn().mockResolvedValue(null),
                delete: jest.fn(),
            };
            (db.batch as jest.Mock) = jest.fn().mockReturnValue(batchMock);

            const fieldValuePairs: {
                fieldName: string;
                fieldValue: string;
            }[] = [
                { fieldName: "field1", fieldValue: "value1" },
                { fieldName: "field2", fieldValue: "value2" },
            ];

            await deleteDocumentsByFieldValues(
                mockCollectionName,
                fieldValuePairs
            );

            expect(queryRef.where).toHaveBeenCalledTimes(2);
            expect(batchMock.delete).toHaveBeenCalledTimes(2);
            expect(batchMock.commit).toHaveBeenCalled();
        });

        it("should throw a Error if deletion by field values fails", async () => {
            const queryRef: MockFirestoreQuery = mockFirestoreQuery([]);
            queryRef.get.mockRejectedValue(new Error("Deletion failed"));
            (db.collection as jest.Mock).mockReturnValue(queryRef);

            const fieldValuePairs: {
                fieldName: string;
                fieldValue: string;
            }[] = [{ fieldName: "field1", fieldValue: "value1" }];

            await expect(
                deleteDocumentsByFieldValues(
                    mockCollectionName,
                    fieldValuePairs
                )
            ).rejects.toThrow(Error);
        });
    });
});