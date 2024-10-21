import { generateSlug } from "../../utils/Utils";
import supabase from "./db";

export async function getAllRooms(from, to, filter = null) {
  let query = supabase.from("rooms").select("*, reservations(id,start_date, end_date, status)", { count: "exact" });
  // if (filter) query = query.order(filter.col, { ascending: filter.ascending });

  if (from !== undefined && to !== undefined) {
    query = query.range(from, to);
  }

  let { data: rooms, error, count } = await query;

  console.log(rooms);

  if (error) {
    throw new Error("Failed to fetch rooms!");
  }

  // await new Promise((res) => setTimeout(res, 2000));

  return { rooms, count };
}

export async function getRoomById(id) {
  let { data: rooms, error } = await supabase.from("rooms").select("*").eq("id", id).single();

  console.log(rooms);

  return rooms;
}

export async function getRoomImages(id) {
  let { data: room_images, error } = await supabase.from("room_images").select("*").eq("room_id", id);

  return room_images;
}

export async function createRoom(roomObj, roomThumbnail, roomImages) {
  const authUser = await supabase.auth.getUser();

  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");

  const thumbnailName = `${new Date().getTime()}`;
  const { data: thumbnail, error: thumbnailError } = await supabase.storage
    .from("rooms-imgs")
    .upload(thumbnailName, roomThumbnail);
  if (thumbnailError) {
    throw new Error("Failed to upload the thumbnail");
  }

  const roomCols = {
    thumbnail: thumbnailName,
    name: roomObj.name,
    capacity: roomObj.capacity,
    price: roomObj.price,
    description: roomObj.description,
    sleeps: roomObj.sleeps,
    available: roomObj.available,
    discount: roomObj.discount,
    slug: generateSlug(roomObj.name),
  };
  const { data: room, error: roomError } = await supabase.from("rooms").insert([roomCols]).select().single();

  //   if (roomError) {
  //   console.log(roomError);
  //   throw new Error(roomError.message);
  // }

  const createdImages = [];
  let uploadFlag = false;
  for (let i = 0; i < roomImages.length; i++) {
    const imgName = `${new Date().getTime()}`;
    console.log(`IMG (${i}) => ${imgName}`);
    console.log(roomImages[i]);
    const { data: img, error: imagesError } = await supabase.storage.from("rooms-imgs").upload(imgName, roomImages[i]);

    if (imagesError) {
      console.log("Images error =>");
      console.log(imagesError);
      uploadFlag = true;
      break;
    }
  }

  let galleryFlag = false;
  if (!uploadFlag) {
    const createdGallery = createdImages.map((item) => ({ img_path: item, room_id: room.id }));

    const { data: roomGallery, error: galleryError } = await supabase
      .from("room_images")
      .insert(createdGallery)
      .select();

    console.log({ data: roomGallery, error: galleryError });

    if (galleryError) galleryFlag = true;
  }

  if (roomError || uploadFlag || galleryFlag) {
    console.log("inserted room => ", room);
    await supabase.storage.from("rooms-imgs").remove([thumbnailName, ...createdImages]);
    await supabase.from("rooms").delete().eq("id", room.id);

    throw new Error("Failed to create room");
  }

  return room;
}

export async function deleteRoom(id) {
  const authUser = await supabase.auth.getUser();

  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");
  const { data: room, error } = await supabase.from("rooms").delete().eq("id", id).select();

  if (error || !room.length) {
    throw new Error("Failed to delete the room");
  }
}

export async function updateRoom(id, roomObj, roomThumbnail, roomImages) {
  const authUser = await supabase.auth.getUser();

  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");
  console.log(roomThumbnail);
  const thumbnailName = `${new Date().getTime()}`;
  if (roomThumbnail) {
    console.log("uploading....");
    const { data: thumbnail, error: thumbnailError } = await supabase.storage
      .from("rooms-imgs")
      .upload(thumbnailName, roomThumbnail);
    if (thumbnailError) {
      console.log(thumbnailError);
      throw new Error("Failed to upload the thumbnail");
    }
  }

  const roomCols = {
    thumbnail: roomThumbnail ? thumbnailName : roomObj.prevThumbnail,
    name: roomObj.name,
    capacity: roomObj.capacity,
    price: roomObj.price,
    description: roomObj.description,
    sleeps: roomObj.sleeps,
    available: roomObj.available,
    discount: roomObj.discount,
    slug: generateSlug(roomObj.name),
  };

  const { data: room, error: roomError } = await supabase.from("rooms").update(roomCols).eq("id", id).select();

  if (roomError || !room.length) {
    console.log("room err", roomError);
    throw new Error("Failed to update!");
  }

  if (roomError && !roomImages && roomThumbnail) {
    await supabase.storage.from("rooms-imgs").remove([thumbnailName]);
    throw new Error("Failed to update room");
  }

  if (!roomImages) return;

  const createdImages = [];
  let uploadFlag = false;
  for (let i = 0; i < roomImages.length; i++) {
    const imgName = `${new Date().getTime()}`;
    console.log(`IMG (${i}) => ${imgName}`);
    console.log(roomImages[i]);
    const { data: img, error: imagesError } = await supabase.storage.from("rooms-imgs").upload(imgName, roomImages[i]);

    if (imagesError) {
      console.log("Images error =>");
      console.log(imagesError);
      uploadFlag = true;
      break;
    }
  }

  let galleryFlag = false;
  if (!uploadFlag) {
    const createdGallery = createdImages.map((item) => ({ img_path: item, room_id: room.id }));

    const { data: roomGallery, error: galleryError } = await supabase
      .from("room_images")
      .insert(createdGallery)
      .select();

    if (galleryError) galleryFlag = true;
  }

  if (uploadFlag || galleryFlag) {
    console.log("inserted room => ", room);
    await supabase.storage.from("rooms-imgs").remove([thumbnailName, ...createdImages]);
    await supabase.from("rooms").delete().eq("id", room.id);

    throw new Error("Failed to update room");
  }

  return room;
}
