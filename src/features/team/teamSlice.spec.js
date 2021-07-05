import { expect } from '@jest/globals';
import teamReducer, {
    addHero,
    deleteHero
} from './teamSlice';

describe('Team reducer', () => {
    const initialState = {
        heroes: [
            {
                id: "69",
                name: "Batman",
                powerstats: {
                    intelligence: 81,
                    strength: 40,
                    speed: 29,
                    durability: 55,
                    power: 63,
                    combat: 90
                }
            }
        ],
        stats: [
            { name: 'intelligence', value: 81 },
            { name: 'strength', value: 40 },
            { name: 'speed', value: 29 },
            { name: 'durability', value: 55 },
            { name: 'power', value: 63 },
            { name: 'combat', value: 90 }
        ],
        totalHeight: 178,
        totalWeight: 77
    };
    const hero = {
        id: "71",
        name: "Batman II",
        powerstats: {
            intelligence: 88,
            strength: 11,
            speed: 33,
            durability: 28,
            power: 36,
            combat: 100
        },
        height: 178,
        weight: 79
    
    }
    it('should handle initial state', () => {
        const actual = teamReducer(undefined, { type: 'unknown' })
        expect(actual.heroes).toHaveLength(0);
        expect(actual.heroes).toEqual([]);
        expect(actual.stats).toEqual([
            { name: 'intelligence', value: 0 },
            { name: 'strength', value: 0 },
            { name: 'speed', value: 0 },
            { name: 'durability', value: 0 },
            { name: 'power', value: 0 },
            { name: 'combat', value: 0 }
        ]);
    });

    it('should handle different initial state', () => {
        const actual = teamReducer(initialState, { type: 'unknown' })
        expect(actual.heroes).toHaveLength(1);
        expect(actual.heroes).toEqual([
            ...initialState.heroes
        ]);
        expect(actual.stats).toEqual([
            ...initialState.stats
        ]);
    });

    it('should handle addHero', () => {
        const actual = teamReducer(initialState, addHero(hero));
        expect(actual.heroes).toHaveLength(2);
        expect(actual.heroes).toEqual([
            ...initialState.heroes,
            hero
        ]);
        expect(actual.stats).toEqual([
            { name: 'intelligence', value: 169 },
            { name: 'strength', value: 51 },
            { name: 'speed', value: 62 },
            { name: 'durability', value: 83 },
            { name: 'power', value: 99 },
            { name: 'combat', value: 190 }
        ])
    });

    it('should handle decrement', () => {
        const actual = teamReducer(initialState, deleteHero("69"));
        expect(actual.heroes).toHaveLength(0);
        expect(actual.heroes).toEqual([]);
        expect(actual.stats).toEqual([
            { name: 'intelligence', value: 0 },
            { name: 'strength', value: 0 },
            { name: 'speed', value: 0 },
            { name: 'durability', value: 0 },
            { name: 'power', value: 0 },
            { name: 'combat', value: 0 }
        ]);
    });
    
    it('should update totalWeight and totalHeight',() => {
        let actual = teamReducer(initialState, addHero(hero));
        expect(actual.totalHeight).toBe(356);
        expect(actual.totalWeight).toBe(156);
        actual = teamReducer(actual, deleteHero("71"));
        expect(actual.totalHeight).toBe(178);
        expect(actual.totalWeight).toBe(77);
    });
})