import { HotelBusinessLogic } from "../server/business.logic/hotel.business.logic";
import { prismaMock } from "../server/singleton";

test("Should create a new hotel", async () => {
  const hotel: {
    id: string;
    name: string;
    address: string;
    images: string[];
    amenities: string[];
    createdAt: Date;
    updatedAt: Date;
  } = {
    id: "your_id_here",
    name: "Hotel Name",
    address: "Hotel Address",
    images: ["image1.jpg", "image2.jpg"],
    amenities: ["wifi", "pool"],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  prismaMock.hotel.create.mockResolvedValue(hotel);
  console.log(prismaMock);
  await expect(HotelBusinessLogic.createHotel(hotel as any)).resolves.toEqual({
    id: "123",
    name: "Hotel Name",
    images: ["image1.jpg", "image2.jpg"],
    address: "Hotel Address",
    amenities: ["WiFi", "Swimming Pool"],
    createdAt: new Date(),
    updatedAt: new Date(),
  });
});
