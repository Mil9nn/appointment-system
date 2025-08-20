import { Client, Account, Databases, ID } from "appwrite";

export const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);

export interface PatientData {
  birthDate: string;
  gender: string;
  allergies: string;
  currentMedication: string;
  familyMedicalHistory: string;
  pastMedicalHistory: string;
  userId?: string;
}

export async function savePatientData(data: PatientData, userId?: string) {
  try {
    const document = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_PATIENTS_COLLECTION_ID!,
      ID.unique(),
      {
        ...data,
        userId: userId || "anonymous",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
    return { success: true, data: document };
  } catch (error) {
    console.error("Appwrite save error:", error);
    return { success: false, error: error };
  }
}

export async function updatePatientData(
  documentId: string,
  data: Partial<PatientData>
) {
  try {
    const document = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_PATIENTS_COLLECTION_ID!,
      documentId, // This was missing!
      {
        ...data,
        updatedAt: new Date().toISOString(),
      }
    );

    return { success: true, data: document };
  } catch (error) {
    console.error("Appwrite update error:", error);
    return { success: false, error: error };
  }
}

export const account = new Account(client);
export { ID } from "appwrite";