import { nunito, vazir } from "../utils/fonts"
import { server } from "@/app/lib/server"
import { v4 as uuidv4 } from 'uuid';
import { IoCloseOutline } from "react-icons/io5";
import { signIn, useSession } from "next-auth/react";



const Tag = ({ tagName }) => {

	console.log(tagName);

	const SelectInput = ()=> {
		const input = document.querySelector('#tag-input')
		console.log(input)
	
		const Space = input.value.indexOf(" ")
		const Dot = input.value.indexOf(".")
		const ExclamationMark = input.value.indexOf("!")
		const Atsign = input.value.indexOf("@")
		const Dollarsign = input.value.indexOf("$")
		const Percent = input.value.indexOf("%")
		const Caret = input.value.indexOf("^")
		const And = input.value.indexOf("&")
		const Asterisk = input.value.indexOf("*")
		const Colon = input.value.indexOf(":")
		const LeftCurlyBracket = input.value.indexOf("{")
		const RightCurlyBracket = input.value.indexOf("}")
		const DivisionSign = input.value.indexOf("÷")
		const EqualsSign = input.value.indexOf("=")
		const OneHalfrFractionn = input.value.indexOf("½")
		const OneQuarterFractionn = input.value.indexOf("¼")
		const OneThirdFractionn = input.value.indexOf("⅓")
		const ThreeQuartersFractionn = input.value.indexOf("¾")
		const TwoThirdsFractionn = input.value.indexOf("⅔")
		const GraveAccent = input.value.indexOf("`")
		const GreaterThanSign = input.value.indexOf(">")
		const LessThanSign = input.value.indexOf("<")
		const Hyphen = input.value.indexOf("-")
		const MultiplicationSign = input.value.indexOf("×")
		const LeftParenthesis = input.value.indexOf("(")
		const RightParenthesis = input.value.indexOf(")")
		const PlusSign = input.value.indexOf("+")
		const QuestionMark = input.value.indexOf("?")
		const QuestionMark2 = input.value.indexOf("؟")
		const QuotationMarks = input.value.indexOf(`"`)
		const Apostrophe = input.value.indexOf(`'`)
		const Semicolon = input.value.indexOf(";")
		const Slash = input.value.indexOf("/")
		const LeftBracket = input.value.indexOf("[")
		const RightBracket = input.value.indexOf("]")
		const SuperscriptOne = input.value.indexOf("¹")
		const SuperscriptTwo = input.value.indexOf("²")
		const SuperscriptThree = input.value.indexOf("³")
		const TradeMarkSign = input.value.indexOf("™")
		const VerticalLine = input.value.indexOf("|")
	
		const array = [Space , Dot , ExclamationMark , Atsign , Dollarsign , Percent , Caret , And , Asterisk , Colon , LeftCurlyBracket ,
			RightCurlyBracket , DivisionSign , EqualsSign , OneHalfrFractionn , OneQuarterFractionn , OneThirdFractionn ,
			ThreeQuartersFractionn , TwoThirdsFractionn ,GraveAccent , GreaterThanSign , LessThanSign , Hyphen , MultiplicationSign ,
			LeftParenthesis , RightParenthesis , PlusSign , QuestionMark , QuestionMark2 , QuotationMarks , Apostrophe , Semicolon , 
			Slash , LeftBracket , RightBracket , SuperscriptOne , SuperscriptTwo , SuperscriptThree , TradeMarkSign , VerticalLine]
	
		const Character = (e) => e !== -1
	
		if (!input.value) {
			console.log("type things");
			input.classList.add('placeholder:text-red-500');	
	
		} else if (input.value[0] !== "#") {
			console.log("no #");
			input.classList.add("text-red-500");
	
		} else if (array.some(Character)) {
			console.log('erorr');
			input.classList.add("text-red-500");
	
		} else if (input.value === '#') {
			console.log('only #');
			input.classList.add("text-red-500");
	
		} else {
			console.log('object');
			input.classList.remove("text-red-500");
			input.classList.add("black");
		}
	
	}
	const handler = (addTag) => {
		const ENTER = 13;
	
		if (addTag.keyCode === ENTER)
		SelectInput();
	};
	
	const blockDropDown = () => {
		const dropdown = document.querySelector('#dropdown')
		dropdown.classList.remove('hidden')
		dropdown.classList.add('block')
	}
	const hiddenDropDown = () => {
		const dropdown = document.querySelector('#dropdown')
		dropdown.classList.remove('block')
		dropdown.classList.add('hidden')
	}



  return (
	<div>
		<div className={`${vazir.className} ${"mt-5"}`}>
			<h1 className="text-xl font-bold nunito">Tags</h1>
			<div className="relative md:w-[633px] space-x-2">
			{/* {
				tagName.map((section) => ( */}
					{/* <div className="relative flex flex-wrap w-full bg-[#f7f7f794] p-3 border-2 border-gray-150 rounded-lg">
						<div className="flex items-center mt-[5px] rounded-md ms-1 overflow-hidden "><div className="px-2 pt-[2px] w-full h-full items-center text-xs sm:text-sm bg-blue-100 text-blue-500">{section.title}</div><IoCloseOutline className="bg-blue-100 text-blue-500 hover:bg-blue-200 w-full h-full px-[2px]" /></div> */}
						{/* <div className="flex items-center mt-[5px] rounded-md ms-1 overflow-hidden "><div className="px-2 pt-[2px] w-full h-full items-center text-xs sm:text-sm bg-blue-100 text-blue-500">#tags</div><IoCloseOutline className="bg-blue-100 text-blue-500 hover:bg-blue-200 w-full h-full px-[2px]" /></div>
						<div className="flex items-center mt-[5px] rounded-md ms-1 overflow-hidden "><div className="px-2 pt-[2px] w-full h-full items-center text-xs sm:text-sm bg-blue-100 text-blue-500">#radio_rah</div><IoCloseOutline className="bg-blue-100 text-blue-500 hover:bg-blue-200 w-full h-full px-[2px]" /></div>
						<div className="flex items-center mt-[5px] rounded-md ms-1 overflow-hidden "><div className="px-2 pt-[2px] w-full h-full items-center text-xs sm:text-sm bg-blue-100 text-blue-500">#رادیو_راه</div><IoCloseOutline className="bg-blue-100 text-blue-500 hover:bg-blue-200 w-full h-full px-[2px]" /></div>
						<div className="flex items-center mt-[5px] rounded-md ms-1 overflow-hidden "><div className="px-2 pt-[2px] w-full h-full items-center text-xs sm:text-sm bg-blue-100 text-blue-500">#پادکست</div><IoCloseOutline className="bg-blue-100 text-blue-500 hover:bg-blue-200 w-full h-full px-[2px]" /></div>
						<div className="flex items-center mt-[5px] rounded-md ms-1 overflow-hidden "><div className="px-2 pt-[2px] w-full h-full items-center text-xs sm:text-sm bg-blue-100 text-blue-500">#پادکست_پرسه</div><IoCloseOutline className="bg-blue-100 text-blue-500 hover:bg-blue-200 w-full h-full px-[2px]" /></div>
						<div className="flex items-center mt-[5px] rounded-md ms-1 overflow-hidden "><div className="px-2 pt-[2px] w-full h-full items-center text-xs sm:text-sm bg-blue-100 text-blue-500">#کست_پلاس</div><IoCloseOutline className="bg-blue-100 text-blue-500 hover:bg-blue-200 w-full h-full px-[2px]" /></div>
						<div className="flex items-center mt-[5px] rounded-md ms-1 overflow-hidden "><div className="px-2 pt-[2px] w-full h-full items-center text-xs sm:text-sm bg-blue-100 text-blue-500">#castplus</div><IoCloseOutline className="bg-blue-100 text-blue-500 hover:bg-blue-200 w-full h-full px-[2px]" /></div>
						<div className="flex items-center mt-[5px] rounded-md ms-1 overflow-hidden "><div className="px-2 pt-[2px] w-full h-full items-center text-xs sm:text-sm bg-blue-100 text-blue-500">#cast_plus</div><IoCloseOutline className="bg-blue-100 text-blue-500 hover:bg-blue-200 w-full h-full px-[2px]" /></div>
						<div className="flex items-center mt-[5px] rounded-md ms-1 overflow-hidden "><div className="px-2 pt-[2px] w-full h-full items-center text-xs sm:text-sm bg-blue-100 text-blue-500">#parse</div><IoCloseOutline className="bg-blue-100 text-blue-500 hover:bg-blue-200 w-full h-full px-[2px]" /></div>
						<div className="flex items-center mt-[5px] rounded-md ms-1 overflow-hidden "><div className="px-2 pt-[2px] w-full h-full items-center text-xs sm:text-sm bg-blue-100 text-blue-500">#podcast</div><IoCloseOutline className="bg-blue-100 text-blue-500 hover:bg-blue-200 w-full h-full px-[2px]" /></div>
						<div className="flex items-center mt-[5px] rounded-md ms-1 overflow-hidden "><div className="px-2 pt-[2px] w-full h-full items-center text-xs sm:text-sm bg-blue-100 text-blue-500">#episode</div><IoCloseOutline className="bg-blue-100 text-blue-500 hover:bg-blue-200 w-full h-full px-[2px]" /></div>
						<div className="flex items-center mt-[5px] rounded-md ms-1 overflow-hidden "><div className="px-2 pt-[2px] w-full h-full items-center text-xs sm:text-sm bg-blue-100 text-blue-500">#tags</div><IoCloseOutline className="bg-blue-100 text-blue-500 hover:bg-blue-200 w-full h-full px-[2px]" /></div> */}
						{/* <input onBlur={hiddenDropDown} onFocus={blockDropDown} onKeyDown={(addTag) => handler(addTag)} onKeyUp={setDataOfSection} id="tag-input" placeholder="Enter Tags..." type="text"  className="outline-none text-sm pt-2 w-0 grow ms-2 bg-[#f7f7f794] min-w-[80px]" />
					</div> */}
				{/* ))
			} */}
			</div>
				<div id="dropdown" className="hidden w-full bg-[#ddd] rounded-lg mb-5 gap-y-2 overflow-auto border-[1px] border-gray-150 max-h-44 no-scrollbar cursor-pointer">
					<div>
					<div className="w-full mt-[1px]"><div className="px-7 hover:bg-slate-50 py-2 text-sm sm:text-md bg-white text-gray-500 duration-150">#tags</div></div>
					<div className="w-full mt-[1px]"><div className="px-7 hover:bg-slate-50 py-2 text-sm sm:text-md bg-white text-gray-500 duration-150">#radio_rah</div></div>
					<div className="w-full mt-[1px]"><div className="px-7 hover:bg-slate-50 py-2 text-sm sm:text-md bg-white text-gray-500 duration-150">#رادیو_راه</div></div>
					<div className="w-full mt-[1px]"><div className="px-7 hover:bg-slate-50 py-2 text-sm sm:text-md bg-white text-gray-500 duration-150">#پادکست_پرسه </div></div>
					<div className="w-full mt-[1px]"><div className="px-7 hover:bg-slate-50 py-2 text-sm sm:text-md bg-white text-gray-500 duration-150">#castplus</div></div>
					<div className="w-full mt-[1px]"><div className="px-7 hover:bg-slate-50 py-2 text-sm sm:text-md bg-white text-gray-500 duration-150">#podcast</div></div>
					</div>
				</div>
		</div>
	</div>
  )
}

export default Tag
