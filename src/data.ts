/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { Person } from './types';

export const rawFamilyTree: Person = {
  id: "dharamdatt",
  name: "DHARAMDATT",
  generation: 0,
  children: [
    {
      id: "anantram",
      name: "Anantram",
      generation: 1,
      parentId: "dharamdatt",
      children: [
        {
          id: "ramdatt",
          name: "Ramdatt",
          generation: 2,
          parentId: "anantram",
          children: [
            {
              id: "ishwaridatt",
              name: "Ishwaridatt",
              generation: 3,
              parentId: "ramdatt",
              children: [
                {
                  id: "motiram",
                  name: "Motiram",
                  generation: 4,
                  parentId: "ishwaridatt",
                  children: [
                    {
                      id: "dinesh",
                      name: "Dinesh",
                      generation: 5,
                      parentId: "motiram",
                      children: [
                        {
                          id: "yogesh",
                          name: "Yogesh",
                          generation: 6,
                          parentId: "dinesh",
                          children: [
                            { id: "aviral", name: "Aviral", generation: 7, parentId: "yogesh" },
                            { id: "atharva", name: "Atharva", generation: 7, parentId: "yogesh" }
                          ]
                        },
                        { id: "alok", name: "Alok", generation: 6, parentId: "dinesh" },
                        {
                          id: "chetan",
                          name: "Chetan",
                          generation: 6,
                          parentId: "dinesh",
                          children: [
                            { id: "shivaay", name: "Shivaay", generation: 7, parentId: "chetan" }
                          ]
                        }
                      ]
                    },
                    {
                      id: "virendra",
                      name: "Virendra",
                      generation: 5,
                      parentId: "motiram",
                      children: [
                        {
                          id: "vikas",
                          name: "Vikas",
                          generation: 6,
                          parentId: "virendra",
                          children: [
                            { id: "yuvaan-vikas", name: "Yuvaan", generation: 7, parentId: "vikas" }
                          ]
                        }
                      ]
                    },
                    { id: "ganesh", name: "Ganesh", generation: 5, parentId: "motiram" }
                  ]
                },
                {
                  id: "purnanad",
                  name: "Purnanad",
                  generation: 4,
                  parentId: "ishwaridatt",
                  children: [
                    {
                      id: "anil",
                      name: "Anil",
                      generation: 5,
                      parentId: "purnanad",
                      children: [
                        { id: "rohan", name: "Rohan", generation: 6, parentId: "anil" }
                      ]
                    }
                  ]
                },
                {
                  id: "chakradhar",
                  name: "Chakradhar",
                  generation: 4,
                  parentId: "ishwaridatt",
                  children: [
                    {
                      id: "girish",
                      name: "Girish",
                      generation: 5,
                      parentId: "chakradhar",
                      children: [
                        {
                          id: "amit",
                          name: "Amit",
                          generation: 6,
                          parentId: "girish",
                          children: [
                            { id: "yuvaan-amit", name: "Yuvaan", generation: 7, parentId: "amit" }
                          ]
                        },
                        {
                          id: "lalit",
                          name: "Lalit",
                          generation: 6,
                          parentId: "girish",
                          children: [
                            { id: "anirudh", name: "Anirudh", generation: 7, parentId: "lalit" }
                          ]
                        }
                      ]
                    },
                    { id: "arunesh", name: "Arunesh", generation: 5, parentId: "chakradhar" },
                    {
                      id: "santosh",
                      name: "Santosh",
                      generation: 5,
                      parentId: "chakradhar",
                      children: [
                        { id: "ashmit", name: "Ashmit", generation: 6, parentId: "santosh" }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "dattram",
          name: "Dattram",
          generation: 2,
          parentId: "anantram",
          children: [
            {
              id: "dayalmani",
              name: "Dayalmani",
              generation: 3,
              parentId: "dattram",
              children: [
                {
                  id: "goverdhan-prasad",
                  name: "Goverdhan Prasad",
                  generation: 4,
                  parentId: "dayalmani",
                  children: [
                    { id: "divyansh", name: "Divyansh", generation: 5, parentId: "goverdhan-prasad" }
                  ]
                },
                {
                  id: "jagmohan-prasad",
                  name: "Jagmohan Prasad",
                  generation: 4,
                  parentId: "dayalmani",
                  children: [
                    { id: "umang", name: "Umang", generation: 5, parentId: "jagmohan-prasad" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "ambadatt",
      name: "Ambadatt",
      generation: 1,
      parentId: "dharamdatt",
      children: [
        {
          id: "gopiram",
          name: "Gopiram",
          generation: 2,
          parentId: "ambadatt",
          children: [
            {
              id: "premvallabh",
              name: "Premvallabh",
              generation: 3,
              parentId: "gopiram",
              children: [
                {
                  id: "jitendra",
                  name: "Jitendra",
                  generation: 4,
                  parentId: "premvallabh",
                  children: [
                    { id: "pranay", name: "Pranay", generation: 5, parentId: "jitendra" }
                  ]
                }
              ]
            },
            {
              id: "janardhan-prasad",
              name: "Janardhan Prasad",
              generation: 3,
              parentId: "gopiram",
              children: [
                { id: "pammi", name: "Pammi", generation: 4, parentId: "janardhan-prasad" },
                { id: "kaku", name: "Kaku", generation: 4, parentId: "janardhan-prasad" }
              ]
            },
            {
              id: "manohar-prasad",
              name: "Manohar Prasad",
              generation: 3,
              parentId: "gopiram",
              children: [
                { id: "nitesh", name: "Nitesh", generation: 4, parentId: "manohar-prasad" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "bhajram",
      name: "Bhajram",
      generation: 1,
      parentId: "dharamdatt",
      children: [
        {
          id: "durgadatt",
          name: "Durgadatt",
          generation: 2,
          parentId: "bhajram",
          children: [
            {
              id: "badridatt",
              name: "Badridatt",
              generation: 3,
              parentId: "durgadatt",
              children: [
                {
                  id: "satyaprasad",
                  name: "Satyaprasad",
                  generation: 4,
                  parentId: "badridatt",
                  children: [
                    {
                      id: "suraj",
                      name: "Suraj",
                      generation: 5,
                      parentId: "satyaprasad",
                      children: [
                        { id: "abhishek", name: "Abhishek", generation: 6, parentId: "suraj" }
                      ]
                    },
                    {
                      id: "ashok-satyaprasad",
                      name: "Ashok",
                      generation: 5,
                      parentId: "satyaprasad",
                      children: [
                        { id: "lakshya", name: "Lakshya", generation: 6, parentId: "ashok-satyaprasad" }
                      ]
                    },
                    {
                      id: "bhupesh",
                      name: "Bhupesh",
                      generation: 5,
                      parentId: "satyaprasad",
                      children: [
                        { id: "shivam", name: "Shivam", generation: 6, parentId: "bhupesh" },
                        { id: "shivaansh", name: "Shivaansh", generation: 6, parentId: "bhupesh" }
                      ]
                    }
                  ]
                },
                {
                  id: "pitambar",
                  name: "Pitambar",
                  generation: 4,
                  parentId: "badridatt",
                  children: [
                    {
                      id: "raajan",
                      name: "Raajan",
                      generation: 5,
                      parentId: "pitambar",
                      children: [
                        { id: "rakshit", name: "Rakshit", generation: 6, parentId: "raajan" }
                      ]
                    },
                    {
                      id: "ravi",
                      name: "Ravi",
                      generation: 5,
                      parentId: "pitambar",
                      children: [
                        { id: "raghav", name: "Raghav", generation: 6, parentId: "ravi" }
                      ]
                    }
                  ]
                },
                {
                  id: "chandiprasad",
                  name: "Chandiprasad",
                  generation: 4,
                  parentId: "badridatt",
                  children: [
                    {
                      id: "veerendra-chandiprasad",
                      name: "Veerendra",
                      generation: 5,
                      parentId: "chandiprasad",
                      children: [
                        { id: "yash", name: "Yash", generation: 6, parentId: "veerendra-chandiprasad" }
                      ]
                    },
                    { id: "neeraj", name: "Neeraj", generation: 5, parentId: "chandiprasad" }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "bheemdatt",
          name: "Bheemdatt",
          generation: 2,
          parentId: "bhajram",
          children: [
            {
              id: "taaradatt",
              name: "Taaradatt",
              generation: 3,
              parentId: "bheemdatt",
              children: [
                {
                  id: "mathura-prasad",
                  name: "Mathura Prasad",
                  generation: 4,
                  parentId: "taaradatt",
                  children: [
                    {
                      id: "chandrashekhar",
                      name: "Chandrashekhar",
                      generation: 5,
                      parentId: "mathura-prasad",
                      children: [
                        { id: "manish", name: "Manish", generation: 6, parentId: "chandrashekhar" }
                      ]
                    },
                    {
                      id: "ashok-kumar",
                      name: "Ashok Kumar",
                      generation: 5,
                      parentId: "mathura-prasad",
                      children: [
                        { id: "devashish", name: "Devashish", generation: 6, parentId: "ashok-kumar" }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        { id: "ramsharan", name: "Ramsharan", generation: 2, parentId: "bhajram" },
        { id: "shreedarshan", name: "Shreedarshan", generation: 2, parentId: "bhajram" }
      ]
    },
    { id: "shankardatt", name: "Shankardatt", generation: 1, parentId: "dharamdatt" },
    { id: "chaitram", name: "Chaitram", generation: 1, parentId: "dharamdatt" },
    {
      id: "panchram",
      name: "Panchram",
      generation: 1,
      parentId: "dharamdatt",
      children: [
        {
          id: "mahimanand",
          name: "Mahimanand",
          generation: 2,
          parentId: "panchram",
          children: [
            {
              id: "naagendradatt",
              name: "Naagendradatt",
              generation: 3,
              parentId: "mahimanand",
              children: [
                {
                  id: "anusuya-prasad",
                  name: "Anusuya Prasad",
                  generation: 4,
                  parentId: "naagendradatt",
                  children: [
                    { id: "bhagwati-prasad", name: "Bhagwati Prasad", generation: 5, parentId: "anusuya-prasad" },
                    {
                      id: "durgaprasad",
                      name: "Durgaprasad",
                      generation: 5,
                      parentId: "anusuya-prasad",
                      children: [
                        { id: "rahul", name: "Rahul", generation: 6, parentId: "durgaprasad" },
                        { id: "kamal", name: "Kamal", generation: 6, parentId: "durgaprasad" }
                      ]
                    },
                    { id: "jagmohan-anusuya", name: "Jagmohan", generation: 5, parentId: "anusuya-prasad" }
                  ]
                },
                {
                  id: "gambhir-prasad",
                  name: "Gambhir Prasad",
                  generation: 4,
                  parentId: "naagendradatt",
                  children: [
                    { id: "mukesh", name: "Mukesh", generation: 5, parentId: "gambhir-prasad" },
                    { id: "manoj", name: "Manoj", generation: 5, parentId: "gambhir-prasad" }
                  ]
                },
                {
                  id: "surendra-prasad",
                  name: "Surendra Prasad",
                  generation: 4,
                  parentId: "naagendradatt",
                  children: [
                    { id: "vijay", name: "Vijay", generation: 5, parentId: "surendra-prasad" },
                    { id: "ajay", name: "Ajay", generation: 5, parentId: "surendra-prasad" }
                  ]
                }
              ]
            },
            { id: "laalmani", name: "Laalmani", generation: 3, parentId: "mahimanand" }
          ]
        },
        {
          id: "thagram",
          name: "Thagram",
          generation: 2,
          parentId: "panchram",
          children: [
            { id: "kedaardatt", name: "Kedaardatt", generation: 3, parentId: "thagram" },
            { id: "vishaalmani", name: "Vishaalmani", generation: 3, parentId: "thagram" },
            { id: "heeramani", name: "Heeramani", generation: 3, parentId: "thagram" }
          ]
        },
        {
          id: "maheshanand",
          name: "Maheshanand",
          generation: 2,
          parentId: "panchram",
          children: [
            {
              id: "lokmani",
              name: "Lokmani",
              generation: 3,
              parentId: "maheshanand",
              children: [
                {
                  id: "dineshchandra",
                  name: "Dineshchandra",
                  generation: 4,
                  parentId: "lokmani",
                  children: [
                    { id: "harshit-dineshchandra", name: "Harshit", generation: 5, parentId: "dineshchandra" }
                  ]
                },
                { id: "jagdishmani", name: "Jagdishmani", generation: 4, parentId: "lokmani" },
                {
                  id: "harishchand",
                  name: "Harishchand",
                  generation: 4,
                  parentId: "lokmani",
                  children: [
                    { id: "alankrit", name: "Alankrit", generation: 5, parentId: "harishchand" }
                  ]
                },
                {
                  id: "girishchand",
                  name: "Girishchand",
                  generation: 4,
                  parentId: "lokmani",
                  children: [
                    { id: "parth", name: "Parth", generation: 5, parentId: "girishchand" },
                    { id: "dron", name: "Dron", generation: 5, parentId: "girishchand" }
                  ]
                }
              ]
            },
            {
              id: "magnanand",
              name: "Magnanand",
              generation: 3,
              parentId: "maheshanand",
              children: [
                { id: "subhash-chand", name: "Subhash Chand", generation: 4, parentId: "magnanand" },
                {
                  id: "brijesh",
                  name: "Brijesh",
                  generation: 4,
                  parentId: "magnanand",
                  children: [
                    { id: "vedaang", name: "Vedaang", generation: 5, parentId: "brijesh" }
                  ]
                }
              ]
            },
            {
              id: "shreedhar-prasad",
              name: "Shreedhar Prasad",
              generation: 3,
              parentId: "maheshanand",
              children: [
                { id: "prakash-chand", name: "Prakash Chand", generation: 4, parentId: "shreedhar-prasad" },
                {
                  id: "suresh",
                  name: "Suresh",
                  generation: 4,
                  parentId: "shreedhar-prasad",
                  children: [
                    { id: "shreyas", name: "Shreyas", generation: 5, parentId: "suresh" }
                  ]
                }
              ]
            }
          ]
        },
        { id: "anandmani", name: "Anandmani", generation: 2, parentId: "panchram" }
      ]
    }
  ]
};

// Flatten helper to easily lookup, count, and build indices
export function flattenTree(node: Person, result: Person[] = []): Person[] {
  result.push(node);
  if (node.children) {
    node.children.forEach(child => flattenTree(child, result));
  }
  return result;
}

export const flattenedPeople = flattenTree(rawFamilyTree);

// Helper to get complete lineage array of names from root down to this person
export function getLineage(person: Person, lookupMap: Map<string, Person>): string[] {
  const lineage: string[] = [];
  let current: Person | undefined = person;
  while (current) {
    if (current.id !== person.id) {
      lineage.unshift(current.name);
    }
    current = current.parentId ? lookupMap.get(current.parentId) : undefined;
  }
  return lineage;
}

export const generationLabels: { [key: number]: string } = {
  0: "Patriarch (Root)",
  1: "1st Generation",
  2: "2nd Generation",
  3: "3rd Generation",
  4: "4th Generation",
  5: "5th Generation",
  6: "6th Generation",
  7: "7th Generation"
};
