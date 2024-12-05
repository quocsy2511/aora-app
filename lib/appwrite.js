import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.six.aora",
  projectId: "67508c9400085c287f94",
  databaseId: "67508e350020a788820b",
  userCollectionId: "67508e680026f60585a6",
  videoCollectionId: "67508ea1001685017236",
  storageId: "675090ac0024f8d4220e",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, username, password) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log("🚀 ~ createUser ~ error:", error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log("🚀 ~ signIn ~ error:", error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    console.log("🚀 ~ getCurrentUser ~ currentAccount:", currentAccount);

    if (!currentAccount) {
      throw Error;
    }
    
    return currentAccount;

    // const currentUser = await databases.listDocuments(
    //   config.databaseId,
    //   config.userCollectionId,
    //   [Query.equal("accountId", currentAccount.$id)]
    // );
    // console.log("🚀 ~ getCurrentUser ~ currentUser:", currentUser);

    // if (!currentUser) throw Error;

    // return currentUser.documents[0];
  } catch (error) {
    console.log("🚀 ~ getCurrentUser ~ error:", error);
  }
};

export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}
