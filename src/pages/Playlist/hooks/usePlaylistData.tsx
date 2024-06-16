import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BasePlaylist, CurrentUserProfile, Playlist, UserProfile } from "../../../models";
import {
  checkIfUserFollowsPlaylist,
  fetchCurrentUserProfile,
  fetchPlaylistById,
  fetchUserPlaylists,
  fetchUserProfileById,
  processUserSavedTracksChunk,
} from "../../../services";

const usePlaylistData = () => {
  const { id: playlistId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [playlist, setPlaylist] = useState<Playlist>();
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [userPlaylists, setUserPlaylists] = useState<Partial<BasePlaylist>[]>();
  const [tracksPresence, setTracksPresence] = useState<boolean[]>([]);
  const [playlistPresence, setPlaylistPresence] = useState<boolean>();
  const [currentUser, setCurrentUser] = useState<CurrentUserProfile>();
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        if (!playlistId) return;

        const playlist = await fetchPlaylistById(playlistId);
        setPlaylist(playlist);

        if (!playlist?.owner?.id) return;

        const userProfile = await fetchUserProfileById(playlist.owner.id);
        setUserProfile(userProfile);

        if (!userProfile?.id) return;

        const userPlaylists = await fetchUserPlaylists(userProfile.id, { limit: 9 });
        setUserPlaylists(userPlaylists.items);

        const trackIds = playlist?.tracks?.items
          .reduce((res, item) => (item.track ? `${res + item.track.id},` : res), "")
          .slice(0, -1);

        if (!trackIds) return;

        const trackPresenceData = await processUserSavedTracksChunk(trackIds.split(","));
        setTracksPresence(trackPresenceData);

        const currentUserData = await fetchCurrentUserProfile();
        setCurrentUser(currentUserData);

        if (!currentUserData?.id) return;

        const playlistPresence = await checkIfUserFollowsPlaylist(playlistId, { ids: currentUserData.id });
        setPlaylistPresence(playlistPresence[0]);
      } catch (err) {
        if (err instanceof Error) {
          setIsError(err.message);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [playlistId]);

  return { playlist, userProfile, userPlaylists, tracksPresence, currentUser, playlistPresence, isLoading, isError };
};

export default usePlaylistData;
