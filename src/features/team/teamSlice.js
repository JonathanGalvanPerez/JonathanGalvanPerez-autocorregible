import { createSlice } from '@reduxjs/toolkit'

const team = createSlice({
    name: 'team',
    initialState: {
        heroes: [],
        stats: [
            { name: 'intelligence', value: 0 },
            { name: 'strength', value: 0 },
            { name: 'speed', value: 0 },
            { name: 'durability', value: 0 },
            { name: 'power', value: 0 },
            { name: 'combat', value: 0 },
        ]
    },
    reducers: {
        addHero: (state, action) => {
            const hero = action.payload;
            if(state.heroes.find(item => item.id === hero.id))
                return;
            state.heroes.push(hero);
            for(const stat in hero.powerstats) {
                const index = state.stats.findIndex(teamStat => teamStat.name === stat)
                state.stats[index].value += Number(hero.powerstats[stat]);
            }
        },
        deleteHero: (state, action) => {
            const id = action.payload;
            const index = state.heroes.findIndex(hero => hero.id === id);
            if(index !== -1) {
                let [deleted] = state.heroes.splice(index, 1);
                for(const stat in deleted.powerstats) {
                    const index = state.stats.findIndex(teamStat => teamStat.name === stat)
                    state.stats[index].value -= Number(deleted.powerstats[stat]);
                }
            }
        }
    }
});


export const { addHero, deleteHero } = team.actions;
export default team.reducer;