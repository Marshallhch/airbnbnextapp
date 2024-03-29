import Image from 'next/image';
import { useContries } from '../lib/getCountries';
import Link from 'next/link';
import { AddToFavoriteButton, DeleteFromFavoriteButton } from './SubmitButtons';
import { DeleteFromFavorite, addToFavorite } from '../actions';

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavoritList: boolean;
  favoritId: string;
  homeId: string;
  pathName: string;
}

export function ListingCard({
  imagePath,
  description,
  location,
  price,
  userId,
  homeId,
  favoritId,
  isInFavoritList,
  pathName,
}: iAppProps) {
  const { getCountryByValue } = useContries();
  const country = getCountryByValue(location);
  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://yotpuyqrcvtwraxhkfcu.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Image of House"
          fill
          className="rounded-lg h-hull object-cov er mb-3"
        />

        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isInFavoritList ? (
              <form action={DeleteFromFavorite}>
                <input type="hidden" name="favoritId" value={favoritId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>

      <Link href={`/home/${homeId}`} className="mt-2">
        <h3 className="font-medium text-base">
          {country?.flag} {country?.label} / {country?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">${price}</span> per night
        </p>
      </Link>
    </div>
  );
}
