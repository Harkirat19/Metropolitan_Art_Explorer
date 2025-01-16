import { useState } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import Error from 'next/error';
import useSWR from 'swr';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function ArtworkCardDetail(object) {

    const { data, error } = useSWR(object.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${object.objectID}` : null);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState();

    function favouritesClicked() {
        if (showAdded) {
            setFavouritesList(current => current.filter(fav => fav != object.objectID));
        } else {
            setFavouritesList(current => [...current, object.objectID]);
        }
        setShowAdded(!showAdded);
    }

    if (error) {
        return <Error statusCode={404} />;
    }

    if (!data) {
        return null;
    }


  const {
    primaryImageSmall,
    title,
    objectDate,
    classification,
    medium,
    artistDisplayName,
    artistWikidata_URL,
    creditLine,
    dimensions,
  } = data;

  return (
    <Card>
      {primaryImageSmall ? (
                <Card.Img variant="top" src={data.primaryImage} />
            ) : (
                <Card.Img variant="top" src="https://via.placeholder.com/375x375.png?text=[+Not+Available+]" />
            )}

      <Card.Body>
        <Card.Title>{title || "N/A"}</Card.Title>
        <Card.Text>

          <h6>
            <b>Date:</b> {objectDate || "N/A"}{" "}
          </h6>
          <h6>
            <b>Classification:</b> {classification || "N/A"}{" "}
          </h6>
          <h6>
            <b>Medium:</b> {medium || "N/A"}{" "}
          </h6>
          <br />

          {artistDisplayName && artistWikidata_URL ? (
            <>
              <b>Artist:</b> {artistDisplayName}
              <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                (wiki)
              </a>
              <br />
            </>
          ) : (
            <>
              <b>Artist:</b> N/A
              <br />
            </>
          )}

          <b>Credit Line:</b> {creditLine || "N/A"}
          <br />
          <b>Dimensions:</b> {dimensions || "N/A"}
          <Button variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked} >
                          {showAdded ? "+ Favourite (added)" : "+ Favourite"}
          </Button>

        </Card.Text>
      </Card.Body>
    </Card>
  );
};
