import allNeighborhoodsDataUpdated from '$lib/server/allNeighborhoodsDataUpdated.json' with { type: 'json' };

export async function load({ params }) {

    return { neighborhoods: allNeighborhoodsDataUpdated };
}