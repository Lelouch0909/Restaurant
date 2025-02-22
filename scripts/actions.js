const { Client, Databases, ID, Storage, Query } = Appwrite;

const databaseId = "67b8d77f000b5f5e2424";
const platsId = "67b8d8830011178c0011";
const ingredientsId = "67b8d78a002c736416ea";
const storageId = "67b9906a001e34336d13";

const client = new Client();
client.setProject("67b743ae00251e3c967b");
client.setEndpoint("https://cloud.appwrite.io/v1");

const database = new Databases(client);

const storage = new Storage(client);

export async function addIngredient(ingredientData, photoData = null) {
  document.getElementById("loader").style.display = "block";
  if (photoData) {
    const imgUrl = await uploadFile(photoData, "image");
    ingredientData = { ...ingredientData, photo_url: imgUrl };
  }

  const promise = database.createDocument(
    databaseId,
    ingredientsId,
    ID.unique(),
    ingredientData
  );
  await promise

    .then(function (response) {
      document.getElementById("loader").style.display = "none";

      alert("Nouvel ingredient ajouté avec succès");
    })
    .catch(function (error) {
      document.getElementById("loader").style.display = "none";

      alert("Erreur lors de l'ajout de l'ingredient:", error);
    });
}

export async function addPlat(platData, photoData = null) {
  document.getElementById("loader").style.display = "block";

  if (photoData) {
    const imgUrl = await uploadFile(photoData, "image");
    platData = { ...platData, photo_url: imgUrl };
  }

  const promise = database.createDocument(
    databaseId,
    platsId,
    ID.unique(),
    platData
  );
  await promise
    .then(function (response) {
      document.getElementById("loader").style.display = "none";

      alert("Nouveau plat ajouté avec succès");
    })
    .catch(function (error) {
      document.getElementById("loader").style.display = "none";

      alert("Erreur lors de l'ajout du plat:", error);
    });
}
// Enregistrer l image
export async function uploadFile(file, type) {
  if (!file) return;

  try {
    const uploadedFile = await storage.createFile(storageId, ID.unique(), file);

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Recuperer le preview de l image
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "image") {
      fileUrl = storage.getFilePreview(storageId, fileId, 1000, 1000);
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllIngredients() {
  try {
    const posts = await database.listDocuments(databaseId, ingredientsId, [
      Query.orderDesc("$createdAt"),
    ]);

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
