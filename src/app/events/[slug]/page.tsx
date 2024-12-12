// TODO: generate static params for slug

const Event = async ({
  params
}: {
  params: Promise<{ slug: string }>
}) => {
  const eventSlug = (await params).slug;
  return (
    <div> Event: {eventSlug} </div>
  );
}
 
export default Event;