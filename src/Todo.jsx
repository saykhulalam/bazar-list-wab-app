import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { MdError } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
} from "firebase/database";

const Todo = () => {
  let [input, setInput] = useState("");
  let [inperror, setInprror] = useState("");
  let [alldeta, setAlldeta] = useState([]);

  let handelInput = (e) => {
    setInput(e.target.value);
    setInprror("");
  };
  let handelSubmit = () => {
    if (input == "") {
      setInprror("please give me your list item");
    } else {
      const db = getDatabase();
      set(push(ref(db, "bazar-list/")), {
        bazarlist: input,
      }).then(() => {
        setInput("");
      });
    }
  };
  useEffect(() => {
    const db = getDatabase();
    const todoRef = ref(db, "bazar-list/");
    onValue(todoRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push({ value: item.val(), id: item.key });
        setAlldeta(array);
      });
    });
  }, []);
  let handelDeleit = (id) => {
    const db = getDatabase();
    remove(ref(db, "bazar-list/" + id));
  };

  return (
    <>
      <section>
        <div className=" max-w-container mx-auto">
          <div className=" border-[2px] border-black px-5 bg-[#222831]">
          <h1 className=" text-[50px] text-center font-bold font-merr bg-red-500 py-5 mt-5 text-white rounded-full">
            Market list
          </h1>
          <div className=" w-full h-[700px mt-10 flex gap-[10px]">
            <input
              value={input}
              onChange={handelInput}
              className=" w-[400px] h-[50px] border-[2px] border-red-500 rounded-full pl-[20px] text-[20px]"
              type="text"
              placeholder="type your list item"
            />
            <button
              className="w-[150px] h-[50px] border-[2px] border-red-500 rounded-full bg-red-500 text-white text-[20px] font-bold hover:bg-transparent hover:text-red-500"
              onClick={handelSubmit}
            >
              submit
            </button>
          </div>
          {inperror && (
            <h1 className="text-[20px] text-red-600 bg-black text-center rounded-full mt-3 py-2 flex items-center gap-4 justify-center">
              {inperror}
              <MdError />
            </h1>
          )}
          <div className="mt-5">
            <ul className="">
              {alldeta.map((item) => (
                <li className="bg-red-500 py-2 text-[20px] font-bold tracking-[2px] text-white flex justify-between px-8 rounded-full pt-3 border-black border-[2px] mb-1">
                  {item.value.bazarlist}
                  <div className="flex gap-4">
                    <button className="w-[30px] h-[30px] border-[2px] rounded-full flex items-center justify-center bg-white text-red-500">
                      <MdModeEdit className="text-[20px]" />
                    </button>
                    <button className="w-[30px] h-[30px] border-[2px] rounded-full flex items-center justify-center bg-white text-red-500 ">
                      <MdDelete
                        className="text-[20px]"
                        onClick={() => handelDeleit(item.id)}
                      />
                    </button>
                  </div>
                </li>
              ))}
              ;
            </ul>
          </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Todo;
