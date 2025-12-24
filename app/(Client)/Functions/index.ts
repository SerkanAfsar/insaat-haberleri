export async function getTabsListData(id?: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_NAME}/api/newses/tab-list?id=${id}`,
    {
      next: {
        revalidate: 3000,
        tags: ["tabsList"],
      },
      cache: "default",
    },
  );

  if (!response.ok) {
    throw new Error("Tabs List Error");
  }
  const result = await response.json();
  return result;
}

export async function getMostReaded3Data() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_NAME}/api/newses/most-readed`,
    {
      next: {
        revalidate: 3000,
        tags: ["mostReaded"],
      },
      cache: "default",
    },
  );

  if (!response.ok) {
    throw new Error("Most Readed Error");
  }
  const result = await response.json();
  return result;
}
