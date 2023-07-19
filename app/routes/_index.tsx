import { useQuery } from "@apollo/client";
import type { V2_MetaFunction } from "@remix-run/node";
import type { Country } from "~/graphql/__generated__/graphql";
import { GET_ALL_COUNTRIES } from "~/graphql/__generated__/queries";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Countries" },
    { name: "description", content: "Query countries with remix and graphQL" },
  ];
};

export default function Index() {
  const { loading, error, data } = useQuery(GET_ALL_COUNTRIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {data.countries.map((country: Country) => (
        <div key={country.code}>
          <h2>{country.emoji} {country.name}</h2>
        </div>
      ))}
    </div>
  );
}
