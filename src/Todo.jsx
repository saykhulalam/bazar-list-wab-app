import React, { useEffect, useState } from "react";
import { MdModeEdit, MdDelete, MdError } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";

const Todo = () => {
  const [input, setInput] = useState("");
  const [inpError, setInpError] = useState("");
  const [allData, setAllData] = useState([]);
  const [editBox, setEditBox] = useState(false);
  const [updt, setUpdt] = useState("");
  const [id, setId] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
    setInpError("");
  };

  const handleSubmit = () => {
    if (input === "") {
      setInpError("Please provide a list item.");
    } else {
      const db = getDatabase();
      push(ref(db, "bazar-list/"), {
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
      const array = [];
      snapshot.forEach((item) => {
        array.push({ value: item.val(), id: item.key });
      });
      setAllData(array);
    });
  }, []);

  const handleDelete = (id) => {
    const db = getDatabase();
    remove(ref(db, "bazar-list/" + id));
  };

  const handleEdit = (item) => {
    setEditBox(true);
    setId(item.id);
  };

  const handleUpdate = () => {
    const db = getDatabase();
    update(ref(db, "bazar-list/" + id), {
      bazarlist: updt,
    }).then(() => {
      setEditBox(false);
    });
  };

  return (
    <section>
      <div className="max-w-container mx-auto">
        <div className="border-[2px] border-black pb-2 rounded-xl px-5 bg-[#222831]">
          <h1 className="text-[50px] text-center font-bold font-merr bg-red-500 py-5 mt-5 text-white rounded-full">
            Market list
          </h1>
          <div className="w-full h-[700px mt-10 flex gap-[5px]">
            <input
              value={input}
              onChange={handleInput}
              className="w-[400px] h-[50px] border-[2px] border-red-500 rounded-full pl-[20px] text-[20px]"
              type="text"
              placeholder="Type your list item"
            />
            <button
              className="w-[100px] h-[50px] border-[2px] border-red-500 rounded-full bg-red-500 text-white text-[15px] font-bold hover:bg-transparent hover:text-red-500"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          {inpError && (
            <h1 className="text-[20px] text-red-600 bg-black text-center rounded-full mt-3 py-2 flex items-center gap-4 justify-center">
              {inpError}
              <MdError />
            </h1>
          )}
          <div className="mt-5">
            <ul className="relative">
              {allData.map((item) => (
                <li
                  key={item.id}
                  className="bg-red-500 py-2 text-[20px] font-bold tracking-[2px] text-white flex justify-between px-8 rounded-full pt-3 border-black border-[2px] mb-1"
                >
                  {item.value.bazarlist}
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="w-[30px] h-[30px] border-[2px] rounded-full flex items-center justify-center bg-white text-red-500"
                    >
                      <MdModeEdit className="text-[20px]" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="w-[30px] h-[30px] border-[2px] rounded-full flex items-center justify-center bg-white text-red-500 "
                    >
                      <MdDelete className="text-[20px]" />
                    </button>
                  </div>
                </li>
              ))}
              {editBox && (
                <div className="w-full p-8 bg-gray-600 rounded-full absolute top-0 left-0">
                  <div>
                    <input
                      onChange={(e) => setUpdt(e.target.value)}
                      className="w-[400px] h-[50px] border-[2px] border-red-500 rounded-full pl-5 text-[20px]"
                      type="text"
                      placeholder="Update your item"
                    />
                    <div className="flex gap-[10px] mt-[10px] justify-end">
                      <button
                        onClick={handleUpdate}
                        className="flex items-center p-2 bg-green-500 rounded-full text-[14px] hover:bg-white hover:border-[1px] hover:border-black border-[1px] border-transparent font-bold gap-[3px]"
                      >
                        Update <RxUpdate />
                      </button>
                      <button
                        onClick={() => setEditBox(false)}
                        className="flex items-center p-2 bg-white rounded-full text-[14px] hover:bg-white hover:border-[1px] hover:border-black border-[1px] border-transparent font-bold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Todo;
