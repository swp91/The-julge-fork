const MAX_RECENT_NOTICES = 6;

export const saveToRecentNotices = (notice: Notice): void => {
  const storedNotices = JSON.parse(
    localStorage.getItem('Recently-view') || '[]',
  ) as Notice[];
  const filteredNotices = storedNotices.filter((n) => n.id !== notice.id);
  const updatedNotices = [notice, ...filteredNotices].slice(
    0,
    MAX_RECENT_NOTICES,
  );
  localStorage.setItem('Recently-view', JSON.stringify(updatedNotices));
};

export const getRecentNotices = (): Notice[] => {
  const storedNotices = localStorage.getItem('Recently-view');
  return storedNotices ? (JSON.parse(storedNotices) as Notice[]) : [];
};
